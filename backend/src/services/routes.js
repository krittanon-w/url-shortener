const Router = require('express').Router

// init
const router = new Router()

// service
const createShortUrl = require('./create-short-url.js')
const createAliasUrl = require('./create-alias-url.js')
const getOriginalUrl = require('./get-original-url.js')
const getAllUrl = require('./get-all-url.js')

// inject 
const prefixUrl = '/api'
// api
router.use(prefixUrl, createShortUrl)
router.use(prefixUrl, createAliasUrl)
router.use(prefixUrl, getAllUrl)
router.use(prefixUrl, getOriginalUrl)

// if no path matched return 404 not found
router.use('*', (req, res, next) => {
    return res.status(404).json({
        success: false,
        message: `not found url [${req.method} ${req.originalUrl}]`
    })
})

module.exports = router