# Sodium Encryption Tool

The Sodium Encryption Tool (SET) provides a public/private key pair generation
through the npm module for libsodium-wrappers. 

## Configuration
- **message**: message to be encrypted then decrypted. This is not required and 
    defaults to *Hello World!* if left blank.
- **seed**: provide this to generate the same key pair each time, leave blank to
    generate a random pair