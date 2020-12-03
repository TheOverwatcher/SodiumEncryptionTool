const { assert } = require('console');
const _sodium = require('libsodium-wrappers');
module.exports = class KeyGenerator {
    constructor(args){
        assert(args, 'Argument object needs to be provided');
        this.message = args.message ? args.message : 'Hello World!';
    }

    generateKeys() {
      return _sodium.ready.then(() => {
        let sodium = _sodium;
        this.keys = sodium.crypto_box_keypair();
        //return {'publicKey':keys.publicKey, 'privateKey':keys.privateKey}
      }).catch((err) => {
        console.log('Error occurred' + err.message);
      });
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
}