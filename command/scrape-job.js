const moment = require('moment')

const InputService = require('../src/services/input-service')
const ScraperService = require('../src/services/scraper-service')

const myArgs = process.argv.slice(2)
const hourToExecute = myArgs[0] || '12'
const inputFileName = myArgs[1]

let lastExecutedDay = null
let running = false

console.log('parameters', { hourToExecute, inputFileName })

if (isNaN(+hourToExecute)) {
    throw Error('Wrong hourToExecute parameter (' + hourToExecute + ') it must be a number')
}
if (+hourToExecute < 0 || +hourToExecute > 23) {
    throw Error('Wrong hourToExecute parameter (' + hourToExecute + ') it must be a value between 0 and 23')
}

setInterval(async function () {
    const currentDay = moment().format('YYYY-MM-DD')
    const currentHour = moment().format('HH')

    if (lastExecutedDay !== currentDay 
        && hourToExecute === currentHour 
        && !running
    ) {
        running = true
    
        const cardUrls = InputService.getCardUrls(inputFileName)
        await ScraperService.scrape(cardUrls)

        running = false
        lastExecutedDay = currentDay
    }
}, 1000)