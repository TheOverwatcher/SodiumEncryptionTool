module.exports = class KeyGenerator {
    constructor(args ){
        this.falseKey = 'falseKey';
    }

    generateKeys() {
      return {'publicKey':this.falseKey}
    }
}