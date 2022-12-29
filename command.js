const Command = require('./src/command')

const myArgs = process.argv.slice(2)
const methodName = myArgs[0]
const parameters = myArgs.slice(1)

Command[methodName](...parameters)