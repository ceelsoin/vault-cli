const database = require('../services/database.service');
const secretPassword = require('../models/secret-passwords.model').secretPassword

module.exports = {
    name: 'store',
    alias: ['s'],
    run: async toolbox => {
      const {
        parameters,
        // template: { generate },
        print: { info, success, error },
        system: {run}
      } = toolbox

      console.log(parameters.options)

      const {login, password, key, help, name, url} = parameters.options

      if(!login || !password)
        error('You must pass --login login@name.com --pass 12345678. need --help ?')  

      if(help){
        info('TO DO...')
      }else{
        if(key){
            info('Storing your credentials...')

            if(name || url)
                secretPassword.service.name = name
                secretPassword.service.url = url

            let keys = database.getKeyChainContent(key, true);
            database.insertNewCredential(secretPassword.service, login, password, keys)

            await run('sleep 2')
            success(`Your credentials has been safely stored!`)
        }
      }
      


    }
}  