const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log(`API -> ${new Date().toUTCString()} - Carregando ${req.path}`)
    next()
})

router.get('/', (req, res) => {
    return res.status(200).send({
        title: `Olá mundo!`
    })
})

module.exports = router