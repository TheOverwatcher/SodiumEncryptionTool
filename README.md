# Sodium Encryption Tool

The Sodium Encryption Tool (SET) provides a public/private key pair generation
through the npm module for libsodium-wrappers. Key generation can occur for
random or seeded keys.

## Configuration
- **message**: message to be encrypted then decrypted. This is not required and 
    defaults to *Hello World!* if left blank.
- **seed**: provide this to generate the same key pair each time, leave blank to
    generate a random pair
- **filename**: name of the output file. Default is *secrets.txt*
- **publicKey**: optional parameter of a hex key to use for encrypting and 
    or decrypting a message
- **privateKey**: optional parameter of a hex key to use for decrypting a message

## Output
The output file is labeled per the filename under the output directory. The output 
contains the following:
- **PUBLIC_KEY**: The hexadecimal version of the public key
- **PRIVATE_KEY**: The hexadecimal version of the private key
- **MESSAGE**: The hexadecimal version of the encrypted message