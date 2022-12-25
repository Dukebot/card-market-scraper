const fs = require('fs')

function getCardUrls() {
    // If the file don't exists, we create it based on the example file
    if (!fs.existsSync('input/cards.txt')) {
        fs.copyFileSync('input/_cards.txt', 'input/cards.txt');
    }

    // Get card urls from file input
    const fileBuffer = fs.readFileSync('input/cards.txt');
    const fileText = fileBuffer.toString().split('\r').join('');
    const cardUrls = fileText.split('\n');

    // Return only valid card urls
    return cardUrls.filter(url => url.startsWith('https://www.cardmarket.com/en/'));
}

function getScrapeJobExecutionHours() {
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

module.exports = {
    getCardUrls,
    getScrapeJobExecutionHours
}