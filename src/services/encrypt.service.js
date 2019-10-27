const Blowfish = require('javascript-blowfish');
const generator = require('./generator.service');

function blowEncrypt(key, content){
    const blowfish = new Blowfish(key);
    return blowfish.encrypt(content);
}   

function blowDecrypt(key, content){
    const blowfish = new Blowfish(key);
    return blowfish.decrypt(content);
}

function generatePrivateKeyHash(){
    return generator.generateRandomHash();
}

module.exports = {
    blowEncrypt,
    blowDecrypt,
    generatePrivateKeyHash
}