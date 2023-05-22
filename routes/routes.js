const express = require('express')
const loginService = require('./login')
const router = express.Router()

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.use((req, res, next) => {
    const horarioAtual = new Date().toUTCString();
    console.log(`${horarioAtual} - Carregando ${req.path}`)
    next()
})

router.post('/login', loginService.login);

const ALUNO = 0
const ORIENTADOR = 1
const ADMINISTRADOR = 2

router.get('/', loginService.checkToken, (req, res) => {
    userType = res.locals.userType
    switch (userType) {
        case ALUNO: {
            renderAluno(res)
            return;
        }
        case ORIENTADOR: {
            renderOrientador(res)
            return;
        }
        case ADMINISTRADOR: {
            renderAdministrador(res)
            return;
        }
     }
})

function renderAluno(res) {
    res.render('indexAluno.ejs', {

    })
}

function renderOrientador(res) {
    res.render('indexOrientador.ejs', {
        
    })
}

function renderAdministrador(res) {
    res.render('indexAdministrador.ejs', {

    })
}

module.exports = router