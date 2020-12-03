const _sodium = require('libsodium-wrappers');
module.exports = class KeyGenerator {
    constructor(args){
        this.message = args.message;
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

    encrypt() {

    }

    decrypt(){

    }

    encryptDecryptTest(){

    }
}