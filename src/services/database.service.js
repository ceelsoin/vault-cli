const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const generator = require('./generator.service');
const homedir = require('os').homedir();
const path = require('path');
const fs = require('fs');


const database = require('../models/database.model').database
const keychain = require('../models/keychain.model').keychain
const encrypt = require('./encrypt.service')

const databaseStorage = new FileSync(getDatabaseLocation());
const db = low(databaseStorage);

const keyChainStorage = new FileSync(getKeychainLocation());
const keyChainDB = low(keyChainStorage);

function generateDatabase(){
    database.storageId = generator.generateRandomHash();
    database.secretPasswords = [],

    db.defaults(database)
    .write()
}
function getDatabaseLocation(){
    let pathDb = path.join(homedir, `database.json`);
    return pathDb;
}

function getKeychainLocation(){
    let pathKey = path.join(homedir, `keychain.json`);
    return pathKey;
}

function generateKeychainStorage(){
    let hash = db.get('storageId').value()
    
    keychain.storageId = hash;
    keychain.keys.push(encrypt.generatePrivateKeyHash());

    keyChainDB.defaults(keychain)
    .write();
}

function getKeyChainContent(path){
    let content = fs.readFileSync(path, "utf8");
    // console.log('content',content)
    return content;
}

module.exports = {
    generateDatabase,
    getDatabaseLocation,
    generateKeychainStorage,
    getKeychainLocation,
    getKeyChainContent
}