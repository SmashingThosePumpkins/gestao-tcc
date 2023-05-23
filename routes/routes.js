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
    userType = res.cookie.userType
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

async function renderAluno(res) {
    const aluno = prisma.aluno.findFirst({ where: { id_usuario: res.cookie.userId } })
    const listaProjetos = prisma.alunosProjeto.findMany({ where: { aluno: { id_usuario: userId } }, include: { Projeto: true } }).map((projeto) => projeto.Projeto)
    res.render('indexAluno.ejs', {
        aluno: aluno,
        listaProjetos: listaProjetos
    })
}

async function renderOrientador(res) {
    const professor = prisma.professor.findFirst({ where: { id_usuario: res.cookie.userId } })
    const listaProjetos = prisma.projeto.findMany({ where: { id_orientador: professor.id } })
    res.render('indexOrientador.ejs', {
        professor: professor,
        listaProjetos: listaProjetos
    })
}

async function renderAdministrador(res) {
    res.render('indexAdministrador.ejs', {})
}

module.exports = router