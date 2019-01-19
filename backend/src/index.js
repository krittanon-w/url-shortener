const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('./share/mongo-client.js')
const services = require('./services/routes.js')

// express init
const app = express()
const config = require('./../config.js').server

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next()
})
app.use(services)

// create mongodb connection
MongoClient.connect((error, client) => {
    if (error) {
        console.log("MongoClient: error", error.toString())
    }
    else {
        // print database information
        let collections = MongoClient.getCollections()
        console.log("MongoClient: connected")
        console.log("MongoClient: collections", collections)

        // start server
        app.listen(config.port, config.host, () => {
            console.log(`Express Server: is listening on port ${config.port}`)
        })
    }
})