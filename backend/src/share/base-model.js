const MongoClient = require('./mongo-client.js')

// util
const getDatabase = () => {
    return MongoClient.getDatabase()
}

const getCollection = () => {
    let db = getDatabase()
    return db.collection('urls')
}

// main
const insertOne = (doc, done) => {
    let collection = getCollection()
    collection.insertOne(doc, (error, result) => {
        return done(error, result.ops[0])
    })
}

const findOne = (query, done) => {
    let collection = getCollection()
    collection.findOne(query, (error, result) => {
        return done(error, result)
    })
}

const findMany = (query, done) => {
    let collection = getCollection()
    collection.find(query).toArray((error, result) => {
        return done(error, result)
    })
}

module.exports = {
    insertOne,
    findOne,
    findMany
}