const moment = require('moment');
const fs = require('fs');
const ScraperService = require('./src/service/scraper-service');

const hoursToExec = parseScrapeJobHoursFile();
const oneHour = 1000 * 60 * 60;

let running = false;

console.log('hoursToExec', hoursToExec);

scrape();
setInterval(scrape, oneHour / 4);

function parseScrapeJobHoursFile() {
    // If the file don't exists, we create it based on the example file
    if (!fs.existsSync('input/scrape_job_hours.txt')) {
        fs.copyFileSync('input/_scrape_job_hours.txt', 'input/scrape_job_hours.txt');
    }

    // Parse the file and return execution hours as array
    return fs.readFileSync('input/scrape_job_hours.txt')
        .toString()
        .split(' ').join('')    
        .split('\r').join('')
        .split('\n');
}

async function scrape() {
    const currentHour = moment().format('HH');

    // Check if current hour matches with some execution hour
    if (hoursToExec.includes(currentHour)) {
        // Run the process if not already running
        if (!running) {
            running = true;
        
            const cardUrls = ScraperService.getCardUrls();
            await ScraperService.scrape(cardUrls);
    
            running = false;
        }
    }
}