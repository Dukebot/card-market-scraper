const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const Service = require('./src/service')

App(process.env.PORT || 3000)

function App(port) {
    const app = express()
    
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.get('/', function (req, res) {
        res.send("Wellcome to the entry point!")
    })

    app.get('/card-articles', async  function (req, res) {
        try {
            const cardUrl = req.query.url
            const result = await Service.Scraper.scrape([cardUrl])
            res.send(result)
        } catch (error) {
            console.log('arriba aquí??????')

            res.status(500).send(error.toString())
        }
    })
    
    app.use(function (req, res, next) {
        res.status(404).send({ error: true, status: 404, message: 'URL not found' })
    })

    app.listen(port, () => {
        console.log("The server is initialized at port:", port)
    })
}