const Router = require('express').Router
const BaseModel = require('./../share/base-model.js')

// init
const router = new Router()

module.exports = router.post('/alias', (req, res, next) => {
    let input = req.body

    // url document
    let doc = {
        shortUrl: input.aliasUrl,
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