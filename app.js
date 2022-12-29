const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const Config = require('./src/config')
const Controller = require('./src/controller')

App(Controller, Config.port)

function App(controllerFunction, port) {
    const app = express()

    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    
    controllerFunction(app)
    
    app.use(function (req, res, next) {
        res.status(404).send({ 
            error: true, 
            status: 404, 
            message: 'URL not found' 
        })
    })
    
    app.listen(port, () => {
        console.log("The server is initialized at port:", port)
    })
}
