const fs = require('fs')

function getCardUrls(inputFileName = 'example-card-list.txt') {
    const inputFilePath = 'input/' + inputFileName

    // Check if the file exists
    if (!fs.existsSync(inputFilePath)) {
        throw Error("The input file doesn't exist -> path: " + inputFilePath)
    }

    // Get card urls from file input
    const fileBuffer = fs.readFileSync(inputFilePath)
    const fileText = fileBuffer.toString().split('\r').join('')
    const cardUrls = fileText.split('\n')

    // Return only valid card urls
    return cardUrls.filter(url => url.startsWith('https://www.cardmarket.com/en/'))
}

module.exports = {
    getCardUrls
}