const KeyGenerator = require('../src/index.js')
const assert = require('assert')

describe('Sodium Encryption Tool provides a public/private key pair', function(){
    it('Sodium is ready to generate a pair of keys', async function(){
        let keyGen = new KeyGenerator();
        let keys = await keyGen.generateKeys();
        assert(keys, 'Keys not provided. Sodium has not returned them.')
    });
    // it('Public Key provided', function() {
    //     let keyGen = new KeyGenerator();
    //     let keys = keyGen.generateKeys();
    //     assert(keys.publicKey, 'Invalid public key provided');
    // });
    // it('Private Key provided', async function() {
    //     let keyGen = new KeyGenerator();
    //     let keys = keyGen.generateKeys();
    //     assert(keys.privateKey, 'Invalid private key provided');
    // });
    
})