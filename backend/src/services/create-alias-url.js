const Router = require('express').Router

// init
const router = new Router()

module.exports = router.post('/alias', (req, res, next) => {
    res.send('create alias url')
})