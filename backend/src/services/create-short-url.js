const Router = require('express').Router

// init
const router = new Router()

module.exports = router.post('/short', (req, res, next) => {
    res.send('create short url')
})