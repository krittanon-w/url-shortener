const MongoClient = require('mongodb').MongoClient

// singleton connection
const database = 'url-shortener'
const url = `mongodb://localhost:27017/${database}`
const options = { 
    useNewUrlParser: true 
}

let mongoClient = null
let currentDb = null

const connect = (done) => {
    MongoClient.connect(url, options)
        .then((client) => {
            // console.log('MONGO: connected')
            mongoClient = client
            currentDb = client.db(database)
        
            done(null, mongoClient)
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
    if (getInstance() != null) {
        currentDb.listCollections().toArray((error, collections) => {
            if (error) {
                console.log('MONGO Error:', error)
            }
            else {
                if (collections === null) {
                    collections = []
                }
                // console.log(`MONGO Collections: [${collections.map((col) => col.name)}]`)
                return collections.map((col) => col.name)
            }
        })
    }
    else {
        return 123
    }
}

module.exports = {
    connect,
    getDatabase,
    getInstance,
    getCollections
}


