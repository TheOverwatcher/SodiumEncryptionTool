const { assert } = require('console');
const _sodium = require('libsodium-wrappers');
module.exports = class KeyGenerator {
    constructor(args){
        this.message = args.message ? args.message : 'Hello World!';
    }

    generateKeys() {
      return _sodium.ready.then(() => {
        let sodium = _sodium;
        let keys = sodium.crypto_box_keypair();
        return {'publicKey':keys.publicKey, 'privateKey':keys.privateKey}
      }).catch((err) => {
        console.log('Error occurred' + err.message);
      });
    }

    encrypt(args) {
        assert(args.publicKey, 'Public Key not provided for encryption');
        return _sodium.ready.then(() => {
          let sodium = _sodium;
          let encryptedMessageLength = sodium.crypto_box_SEALBYTES + this.message.length;
          let encryptedMessage = Buffer.alloc(encryptedMessageLength);
          encryptedMessage = sodium.crypto_box_seal(this.message, args.publicKey);
          return encryptedMessage;
        }).catch((err) => {
          console.log('Error occurred' + err.message);
        });
    }

    decrypt(args){

    }

    encryptDecryptTest(){

    }
}