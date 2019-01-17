const Router = require('express').Router
const BaseModel = require('./../share/base-model.js')

// init
const router = new Router()

module.exports = router.get('/urls', (req, res, next) => {
    // get all documents
    let query = { }

    // find all doc
    BaseModel.findMany(query, (error, result) => {
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