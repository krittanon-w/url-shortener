const MongoClient = require('mongodb').MongoClient

// mongodb init
const config = require('./../config.js').mongodb
const url = config.url
const database = config.database
const options = config.options

// singleton connection
let mongoClient = null
let currentDb = null
let collections = 123

const connect = (done) => {
    MongoClient.connect(url, options)
        .then((client) => {
            // console.log('MONGO: connected')
            mongoClient = client
            currentDb = client.db(database)
        
            // push collection to collections
            currentDb.listCollections().toArray((error, collectionList) => {
                if (error) {
                    console.log('MONGO Error:', error)
                }
                else {
                    collections = collectionList.map((col) => col.name)
                }
                done(null, mongoClient)
            })
            
        })
        .catch((error) => {
            done(error, null)
        })
}

const getInstance = () => {
    return mongoClient == null ? null : mongoClient
}

const getDatabase = () => {
    return currentDb == null ? null : currentDb
}

const getCollections = () => {
    return getInstance() == null ? null : collections
}

module.exports = {
    connect,
    getDatabase,
    getInstance,
    getCollections
}


