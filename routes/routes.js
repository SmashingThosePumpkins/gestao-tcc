const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log(`${new Date().toUTCString()} - Carregando ${req.path}`)
    next()
})

router.get('/', (req, res) => {
    return res.status(200).render('index.ejs', {
        title: `Olá mundo!`
    })
})

module.exports = router