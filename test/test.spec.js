const KeyGenerator = require('../src/index.js')
const assert = require('assert')

describe('Sodium Encryption Tool provides a public/private key pair', function(){
    let encryptedMessage, decryptedMessage, keys, keyGen;
    before(async function(){
        keyGen = new KeyGenerator({
            'message': 'Hello World'
        });
        keys = await keyGen.generateKeys();

        encryptedMessage = await keyGen.encrypt({
            'publicKey':keys.publicKey,
        });

        decryptedMessage = await keyGen.decrypt({
            'encryptedMessage':encryptedMessage,
            'publicKey':keys.publicKey,
            'privateKey':keys.privateKey
        });
    });
    it('Sodium is ready to generate a pair of keys', function(){
        assert(keys, 'Keys not provided. Sodium has not returned them.')
    });
    it('Public Key provided', function() {
        assert(keys.publicKey, 'Invalid public key provided');
    });
    it('Private Key provided', function() {
        assert(keys.privateKey, 'Invalid private key provided');
    });
    it('Public Key can encrypt a message', async function(){
        assert(encryptedMessage.toString().length > 0, 'Invalid encrypted message provided');
    });
    it('Public and Private Keys can decrypt the encrypted message', async function(){
        assert(decryptedMessage && decryptedMessage.toString().length > 0, 'Invalid encrypted message provided');
    });
})