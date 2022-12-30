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

module.exports = {
    getCardUrls
}