# Vault CLI
## Work in progress

A CLI for store passwords safely.

## Get started

To install, run:
`npm install -g password-vault`
`vault generate`

Then generate private keys and db start to store your passwords

`vault store --login myuser@account.com --password mypassword --key "C:\path\to\my\keychain.json"`

Vault CLI use blowfish to encrypt passwords by private key

Store your privatekey safely

# License

MIT - see LICENSE

