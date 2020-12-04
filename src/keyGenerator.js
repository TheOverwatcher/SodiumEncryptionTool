const { assert } = require('console');
const config = require('../config.json');
const fs = require('fs');
const _sodium = require('libsodium-wrappers');
const StringBuilder = require('node-stringbuilder');
module.exports = class KeyGenerator {
    constructor(){
        this.message = config.message && config.message.length > 0
          ? config.message 
          : 'Hello World!';
        this.filename = config.filename && config.filename.length > 0 
          ? config.filename 
          : 'secrets.txt'; 
        this.stringKeys = {};
        this.hexKeys = {};
        this.outputDir = './output/';
    }

    createHexKeys(){
        return _sodium.ready.then(() => {
            let sodium = _sodium;
            this.hexKeys.publicKey = sodium.to_hex(this.keys.publicKey);
            this.hexKeys.privateKey = sodium.to_hex(this.keys.privateKey);
        }).catch((err) => {
            console.log('Error occurred ' + err.message);
        });
    }

    createHexMessage(args){
        assert(args.encryptedMessage, 'Encrypted message not provided for conversion');
        return _sodium.ready.then(() => {
            let sodium = _sodium;
            this.hexMessage = sodium.to_hex(args.encryptedMessage);
        }).catch((err) => {
            console.log('Error occurred ' + err.message);
        });
    }

    decrypt(args){
        assert(args.encryptedMessage, 'Message not provided for decryption');
        assert(this.keys.publicKey, 'Public Key not provided for decryption');
        assert(this.keys.privateKey, 'Private Key not provided for decryption');
        return _sodium.ready.then(() => {
          let sodium = _sodium;
          let decryptedMessage = Buffer.alloc(args.encryptedMessage.length);
          decryptedMessage = sodium.crypto_box_seal_open(
            args.encryptedMessage, this.keys.publicKey, this.keys.privateKey
          );
          return decryptedMessage;
        }).catch((err) => {
          console.log('Error occurred ' + err.message);
        });
    }

    doesMessageMatch(args){
        assert(args.decryptedMessage, 'Decrypted message not provided');
        let decoder = new TextDecoder('ascii');
        return decoder.decode(args.decryptedMessage) == this.message;
    }
    
    encrypt() {
        assert(this.keys.publicKey, 'Public Key not provided for encryption');
        return _sodium.ready.then(() => {
          let sodium = _sodium;
          let encryptedMessageLength = sodium.crypto_box_SEALBYTES + this.message.length;
          let encryptedMessage = Buffer.alloc(encryptedMessageLength);
          encryptedMessage = sodium.crypto_box_seal(this.message, this.keys.publicKey);
          return encryptedMessage;
        }).catch((err) => {
          console.log('Error occurred' + err.message);
        });
    }

    generateKeys() {
        return _sodium.ready.then(() => {
          let sodium = _sodium;
          this.keys = config.seed && config.seed.length > 0 
            ? sodium.crypto_box_seed_keypair(config.seed)
            : sodium.crypto_box_keypair();
          return true;
        }).catch((err) => {
          console.log('Error occurred' + err.message);
        });
    }
    async process() {
        // Generate new keys
        let result = await this.generateKeys();

        // Validate the keys
        result = result && await this.validateKeys();

        // Output the keys
        result = result && await this.writeKeysToFile();
        return result;
    }

    async validateKeys(){
        return this.doesMessageMatch({
            'decryptedMessage': await this.decrypt({
                'encryptedMessage': await this.encrypt()
            })
        });
    }

    async writeKeysToFile(){
        // Return true if successful
        await this.createHexKeys();
        let encryptedMessage =  await this.encrypt();
        await this.createHexMessage({
            'encryptedMessage':encryptedMessage
        });
        let data = new StringBuilder('PUBLIC_KEY=')
            .append(this.hexKeys.publicKey)
            .append('\nPRIVATE_KEY=')
            .append(this.hexKeys.privateKey)
            .append('\nMESSAGE=')
            .append(this.hexMessage)
            .toString();
        fs.writeFile(this.outputDir + this.filename, data, (err) => {
            if(err) {
                console.log('Error occurred when writing to file');
                throw err;
            }
        });
        return true;
    }
}