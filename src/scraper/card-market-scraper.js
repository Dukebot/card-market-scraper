const moment = require('moment')

const Scraper = require('./scraper')

/**
 * Number of times that the scraper will press the load more button.
 * I had to put this limit because for some reason it keeps pressing 
 * the button forever even if the button it's not there anymore.
 */
const loadMoreBtnMaxPresses = 15

/**
 * Scrape card market cards articles info
 * @param {array} cardUrls Array of strings containing the cards urls
 * @returns {array}
 */
async function scrapeCardsArticles(cardUrls) {
    const today = moment().format('YYYY-MM-DD')

    return Scraper.scrape(async function (browser) {
        const page = await Scraper.newPage(browser)

        let cards = []
        
        // Navigate to each card url and extract articles information
        for (const cardUrl of cardUrls) {
            const card = await getCardArticles(page, cardUrl)
            
            for (const article of card.articles) {
                article.day = today
            }   
            
            cards.push(card)

            // Add a delay to reduce the request rate
            await Scraper.waitRandom(1000, 2000)
        }

        return cards
    })
}

/**
 * Scrape card market card articles info (single card)
 * @param {string} cardUrl String representing the card url
 * @returns {object} Card data with articles array info
 */
async function scrapeCardArticles(cardUrl) {
    const today = moment().format('YYYY-MM-DD')

    return Scraper.scrape(async function (browser) {
        const page = await Scraper.newPage(browser)

        const card = await getCardArticles(page, cardUrl)   

        for (const article of card.articles) {
            article.day = today
        }

        return card
    })
}

/**
 * Scrapes the card article list from card's url
 * @param {object} page
 * @param {string} cardUrl
 * @returns {object} Object with card general info and an array of articles
 */
async function getCardArticles(page, cardUrl) {
    // Navigate to card URL
    await Scraper.goTo(page, cardUrl)

    // Press load more button to display all the cards
    await Scraper.pressLoadMoreButton(page, '#loadMoreButton', loadMoreBtnMaxPresses)

    // Extract page data
    const nameAndEdition = await getNameAndEdition(page)
    const headerInfo = await getHeaderInfo(page)
    const articles = await getArticles(page)

    // Return object with the card info and array of articles
    return { 
        url: cardUrl,
        collection: cardUrl.split('/')[4],
        ...nameAndEdition, 
        articles,
    }
}

/**
 * Get's the name and edition of the card
 * @returns {object} Object with name and edition properties
 */
async function getNameAndEdition(page) {
    return page.evaluate(() => {
        try {
            const h1Elem = document.querySelector('h1')
            if (h1Elem === null) return { error: 'h1Elem is null' }

            return {
                name: h1Elem.innerText.split('\n')[0],
                edition: h1Elem.innerText.split('\n')[1].split(' - ')[0],
            }
        } catch (error) {
            return error.toString()
        }
    })
}

// TODO this function is incomplete as the card pages do not have always the same structure
/**
 * @returns {object} Object with card genera info
 */
async function getHeaderInfo(page) {
    return page.evaluate(() => {
        try {
            const dlElem = document.querySelector('dl.labeled')
            if (dlElem === null) return { error: 'd1Elem is null' }

            const ddElemArray = dlElem.querySelectorAll('dd')
            if (ddElemArray === null) return { error: 'ddElemArray is null' }

            let offset = 0;
            if (isNumeric(ddElemArray[1].innerText))
                offset = 1

            return {
                number: ddElemArray[0 + offset].innerText,
                articlesAvailable: ddElemArray[3 + offset].innerText,
                priceTendancy: ddElemArray[4 + offset].innerText,
                averagePrice: {
                    '30Days': ddElemArray[5 + offset].innerText,
                    '7Days': ddElemArray[6 + offset].innerText,
                    '1Day': ddElemArray[7 + offset].innerText,
                },
            }
        } catch (error) {
            return error.toString()
        }

        function isNumeric(str) {
            if (typeof str != "string") return false // we only process strings!  
            return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
                !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
        }
    })
}

/**
 * @returns {array} Array of card articles
 */
async function getArticles(page) {
    return page.evaluate(() => {
        try {
            const articles = []

            const articleElemArray = document.querySelectorAll('div.article-row')
            for (const articleElem of articleElemArray) {

                const data = {
                    location: '',
                    language: '',
                    signed: false,
                    altered: false,
                    playset: false,
                    foil: false,
                }
                const debugData = []

                const spanElements = articleElem.querySelectorAll('span.icon')
                for (const spanElement of spanElements) {
                    const attrValue = spanElement.getAttribute('data-original-title')
                    if (attrValue === null) continue

                    if (attrValue.includes('Item location: ')) {
                        data.location = attrValue.replace('Item location: ', '')
                    }
                    if (["English", "Spanish", "German", "French", "Italian", "Portuguese"].includes(attrValue)) {
                        data.language = attrValue
                    }
                    if (attrValue.includes('Signed')) {
                        data.signed = true
                    }
                    if (attrValue.includes('Altered')) {
                        data.altered = true
                    }
                    if (attrValue.includes('Playset')) {
                        data.playset = true
                    }
                    if (attrValue.includes('Foil')) {
                        data.foil = true
                    }

                    debugData.push(attrValue)
                }

                const article = {
                    seller: articleElem.querySelector('span.seller-name').innerText.split('\n').join(' '),
                    status: articleElem.querySelector('div.product-attributes').innerText,
                    price: articleElem.querySelector('div.price-container').innerText,
                    stock: articleElem.querySelector('div.amount-container').innerText,
                    ...data,
                    debugData
                }

                // Remove price per unit from the price string
                if (article.price.includes('(PPU:')) {
                    article.price = article.price.replace('(PPU:', '')
                }

                articles.push(article)
            }

            return articles
        } catch (error) {
            return error.toString()
        }
    })
}


module.exports = { 
    scrapeCardsArticles, 
    scrapeCardArticles,
}