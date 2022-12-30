const moment = require('moment')

const InputService = require('./src/services/input-service')
const ScraperService = require('./src/services/scraper-service')

const myArgs = process.argv.slice(2)
const hourToExecute = myArgs[0] || '12'
const inputFileName = myArgs[1]

let lastExecutedDay = null
let running = false

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