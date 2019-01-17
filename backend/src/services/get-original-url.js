const Router = require('express').Router

// init
const router = new Router()

module.exports = router.get('/:url', (req, res, next) => {
    res.send('get original url')
})