const _sodium = require('libsodium-wrappers');
module.exports = class KeyGenerator {
    constructor(args ){
        this.falseKey = 'falseKey';
    }

    generateKeys() {
      return _sodium.ready.then(() => {
        return {'publicKey':this.falseKey, 'privateKey': this.falseKey}
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