const Router = require('express').Router
const BaseModel = require('./../share/base-model.js')
const Bases = require('bases')
const ObjectID = require('mongodb').ObjectID

// init
const router = new Router()

const toShortId = (longHexId) => {
    let shortHexId = longHexId.slice(0, 8) + longHexId.slice(-2)
    let base10 = Bases.fromBase16(shortHexId)
    let base62 = Bases.toBase62(base10)
    return base62
}

module.exports = router.post('/short', (req, res, next) => {
    let input = req.body

    // generate mongo object id
    let objectId = new ObjectID()
    
    // url document
    let doc = {
        _id: objectId,
        shortUrl: toShortId(objectId.toHexString()),
        originalUrl: input.originalUrl
    }

    // insert to database
    BaseModel.insertOne(doc, (error, result) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
        return res.json({
            success: true,
            data: result
        })
    })
})