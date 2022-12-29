const App = require('./src/app')
const Config = require('./src/config')
const CardMarketScraper = require('./src/scraper/card-market-scraper')
const Entity = require('./src/entity')
const Service = require('./src/service')

const app = new App(function (app) {
    app.get('/', function (req, res) {
        res.send("Wellcome to the entry point!")
    })

    app.get('/card-articles', async function (req, res) {
        try {
            const cardUrl = req.query.url

            const result = await CardMarketScraper.scrapeCardsArticles([cardUrl]).then(cards => {
                return cards.map(card => new Entity.Card(card))
            });

            res.send(result)
        } catch (error) {
            res.status(500).send(error.toString())
        }
    })
})

app.run(Config.port)