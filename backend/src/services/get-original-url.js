const Router = require('express').Router
const BaseModel = require('./../share/base-model.js')

// init
const router = new Router()

module.exports = router.get('/:url', (req, res, next) => {
    let url = req.params.url

    // get all documents
    let query = {
        shortUrl: url
    }

    // find url from database
    BaseModel.findOne(query, (error, result) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
        else {
            if (result == null) {
                // res.redirect('/error/404')
                return next()
            }
            else {
                let originalUrl = result.originalUrl
                return res.redirect(originalUrl)
            }
        }
    })
})