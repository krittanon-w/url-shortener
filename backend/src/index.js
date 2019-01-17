const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('./share/mongo-client.js')
const services = require('./services/routes.js')

// express init
const app = express()
const config = require('./config.js').server

app.use(bodyParser.json())
app.use(services)

// create mongodb connection
MongoClient.connect((error, client) => {
    if (error) {
        console.log("MongoClient: error", error.toString())
    }
    else {
        // print database informatio
        let collections = MongoClient.getCollections()
        console.log("MongoClient: connected")
        console.log("MongoClient: collections", collections)

        // start server
        app.listen(config.port, () => {
            console.log(`Express Server: is listening on port ${config.port}`)
        })
    }
})