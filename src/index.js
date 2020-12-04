const { config } = require('process')
const KeyGenerator = require('../src/keyGenerator.js')

const keyGen = new KeyGenerator();

if(async () => await keyGen.process() === true){
    console.log('Successfully generated keys and an ecrypted message.')
}