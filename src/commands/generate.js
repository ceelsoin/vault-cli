const database = require('../services/database.service');
var emoji = require('node-emoji')
var qrcode = require('qrcode-terminal');
var CryptoJS = require("crypto-js");

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async toolbox => {
    const {
      parameters,
      // template: { generate },
      print: { info, success, error, spin },
      system: {run}
    } = toolbox
    
    info('Generating your secure vault storage...')
    await run('sleep 2')


    // const name = parameters.first
    try{
      database.generateDatabase();
      await run('sleep 2')
      success(`✅  Your hash vault storage is done. Writed in: ${database.getDatabaseLocation()}`)
    
    }catch(err){
      error(`❗  Error generating database ${err}`)
    }
    
    info(`${emoji.emojify(':key:')} Generating keys...`);
    try{
      await run('sleep 2')
      database.generateKeychainStorage()

      let key_location = database.getKeychainLocation();

      success(`Your keychain generated and writed in: ${key_location}`)

      let keychainContent = JSON.stringify(database.getKeyChainContent(key_location));

      let buff = new Buffer.alloc(keychainContent.length, keychainContent);
      let base64data = buff.toString('base64');

      qrcode.generate(keychainContent, {small: true});
      info(`Scan the code if you prefeer store keychain on mobile app`);
      info('---------------------------------------------------------')
      info(`Base64 Encoded:`);
      info(`${base64data}`);
    }catch(err){
      error(`❗ Error generating keychain ${err}`)
    }    
  }
}
