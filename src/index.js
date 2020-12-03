const _sodium = require('libsodium-wrappers');
module.exports = class KeyGenerator {
    constructor(args){
        this.defaultKey = args.defaultKey;
        this.message = args.message;
    }

    generateKeys() {
      return _sodium.ready.then(() => {
        return {'publicKey':this.defaultKey, 'privateKey': this.defaultKey}
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