const KeyGenerator = require('../src/keyGenerator.js')
const assert = require('assert')

describe('Sodium Encryption Tool provides a public/private key pair', function(){
    let encryptedMessage, decryptedMessage, keys, keyGen;
    before(async function(){
        keyGen = new KeyGenerator({
            'message': 'Hello World'
        });
        await keyGen.generateKeys();
        keys = keyGen.keys;

        encryptedMessage = await keyGen.encrypt();

        decryptedMessage = await keyGen.decrypt({
            'encryptedMessage':encryptedMessage
        });
    });
    it('Sodium is ready to generate a pair of keys', function(){
        assert(keyGen.keys, 'Keys not provided. Sodium has not returned them.')
    });
    it('Public Key was generated', function() {
        assert(keys.publicKey, 'Invalid public key provided');
    });
    it('Private Key was generated', function() {
        assert(keys.privateKey, 'Invalid private key provided');
    });
    it('Public Key can encrypt a message', async function(){
        assert(encryptedMessage.toString().length > 0, 'Invalid encrypted message provided');
    });
    it('Public and Private Keys can decrypt the encrypted message', async function(){
        assert(decryptedMessage && decryptedMessage.toString().length > 0, 'Invalid encrypted message provided');
    });
    it('The decrypted message matches the original message', function() {
        assert(keyGen.doesMessageMatch({
            'decryptedMessage':decryptedMessage
        }),'Messages do not match after decryption.');
    });
})