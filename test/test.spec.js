const KeyGenerator = require('../src/index.js')
const assert = require('assert')

describe('Sodium Encryption Tool provides a public/private key pair', function(){
    it('Public Key provided', function() {
        let keyGen = new KeyGenerator();
        let results = keyGen.generateKeys();
        assert(results.publicKey);
    })
})