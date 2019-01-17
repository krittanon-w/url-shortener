const Router = require('express').Router

// init
const router = new Router()

module.exports = router.get('/urls', (req, res, next) => {
    res.send('list all of url in db')
})