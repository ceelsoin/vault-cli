module.exports = {
    name: 'generate',
    alias: ['g'],
    run: async toolbox => {
      const {
        parameters,
        // template: { generate },
        print: { info, success, error },
        system: {run}
      } = toolbox
      
      info('Generating your secure vault storage...')
      await run('sleep 2')
    }
}  