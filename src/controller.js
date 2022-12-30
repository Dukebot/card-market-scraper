const CardMarketScraper = require('./scraper/card-market-scraper')
const Entity = require('./entity')

function Controller(app) {
    app.get('/', function (req, res) {
        res.send("Wellcome to the entry point!")
    })

    app.get('/card-articles', async function (req, res) {
        try {
            const cardUrl = req.query.url

            const result = await CardMarketScraper
                .scrapeCardArticles(cardUrl)
                .then(card => new Entity.Card(card))

            res.send(result)
        } catch (error) {
            res.status(500).send(error.toString())
        }
    })
}

module.exports = Controller