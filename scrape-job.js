const moment = require('moment');
const fs = require('fs');
const ScraperService = require('./src/service/scraper-service');

const hoursToExec = parseScrapeJobHoursFile();
console.log('hoursToExec', hoursToExec);

function parseScrapeJobHoursFile() {
    if (!fs.existsSync('input/scrape_job_hours.txt')) {
        throw Error('The file "input/scrape_job_hours.txt" does not exist. Please create it and put in the card urls there...');
    }

    return fs.readFileSync('input/scrape_job_hours.txt')
        .toString()
        .split(' ').join('')    
        .split('\r').join('')
        .split('\n');
}

const oneHour = 1000 * 60 * 60;

let running = false;

scrape();
setInterval(scrape, oneHour / 4);

async function scrape() {
    const currentHour = moment().format('HH');

    if (hoursToExec.includes(currentHour)) {
        if (!running) {
            running = true;
        
            const cardUrls = ScraperService.getCardUrls();
            await ScraperService.scrape(cardUrls);
    
            running = false;
        }
    }
}