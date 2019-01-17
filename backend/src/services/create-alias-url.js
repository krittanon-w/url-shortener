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

    let query = {
        shortUrl: input.aliasUrl
    }

    // check alias is exist or not
    BaseModel.findOne(query, (error, findResult) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
        else {
            // check alias is exist
            if (findResult != null) {
                return res.json({
                    success: false,
                    message: "this alias has taken"
                })
            }
            else {
                // insert to database
                BaseModel.insertOne(doc, (error, insertResult) => {
                    if (error) {
                        return res.status(500).json({
                            success: false,
                            message: error.message
                        })
                    }
                    return res.json({
                        success: true,
                        data: insertResult
                    })
                })
            }
        }
    })

})