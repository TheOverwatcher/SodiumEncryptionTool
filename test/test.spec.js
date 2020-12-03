const KeyGenerator = require('../src/keyGenerator.js')
const assert = require('assert')
const config = require('../config.json');

describe('Sodium Encryption Tool provides a public/private key pair', function(){
    let encryptedMessage, decryptedMessage, keys, keyGen;
    before(async function(){
        keyGen = new KeyGenerator();
        await keyGen.generateKeys();
        keys = keyGen.keys;

        encryptedMessage = await keyGen.encrypt();

        decryptedMessage = await keyGen.decrypt({
            'encryptedMessage':encryptedMessage
        });
    });
    it('Verify the whole process completes', async function(){
        assert(await keyGen.process() === true,'Process did not fully complete');
    })
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
    it('Seeding a key returns the same key each time', function(){
        config.seed = config.seed && config.seed.length === 0 ? "abcdefghi" : config.seed;
        let keyGen1 = new KeyGenerator();
        keyGen1.generateKeys();
        let keyGen2 = new KeyGenerator();
        keyGen2.generateKeys();
        let keysMatch = keyGen1.privateKey === keyGen2.privateKey 
            && keyGen1.publicKey === keyGen2.publicKey;
        assert(keysMatch, 'Keys do not match given the seed');
    });
})