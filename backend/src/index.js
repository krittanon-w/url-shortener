const express = require('express')
const MongoClient = require('./share/mongo-client.js')



// express init
const app = express()
const config = require('./config.js').server

app.get('/:shortUrl', (req, res) => { 
    res.redirect('http://www.google.com')
})

app.get('/api/url/:shortUrl', (req, res) => { 
    res.send('get url info')
})

app.post('/api/short', (req, res) => { 
    res.send('create shirt url by original url')
})

app.post('/api/alias', (req, res) => { 
    res.send('create short url by alias')
})

app.post('/api/internal/list', (req, res) => { 
    res.send('list all of url in db')
})

// start server
app.listen(config.port, () => {
    console.log(`Express is listening on port ${config.port}`)
})

MongoClient.connect((error, client) => {
    if (error) {
        console.log("MongoClient: error", error.toString())
    }
    else {
        let collections = MongoClient.getCollections()
        console.log("MongoClient: connected")
        console.log("MongoClient: collections", collections)
    }
})