const express = require('express')
const loginService = require('./login')
const router = express.Router()

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ALUNO = 0
const ORIENTADOR = 1
const ADMINISTRADOR = 2

router.use((req, res, next) => {
    const horarioAtual = new Date().toUTCString();
    console.log(`${horarioAtual} - Carregando ${req.path}`)
    next()
})

router.post('/login', loginService.login);

router.get('/', loginService.checkToken, async (req, res) => {
    userType = res.cookie.decodedInfo.userType
    switch (userType) {
        case ALUNO: {
            const aluno = prisma.aluno.findFirst({ where: { id_usuario: res.cookie.decodedInfo.userId } })
            const listaProjetos = prisma.alunosProjeto.findMany({ where: { aluno: { id_usuario: userId } }, include: { Projeto: true } }).map((projeto) => projeto.Projeto)
            res.render('indexAluno.ejs', {
                aluno: aluno,
                listaProjetos: listaProjetos
            })
            return;
        }
        case ORIENTADOR: {
            const professor = prisma.professor.findFirst({ where: { id_usuario: res.cookie.decodedInfo.userId } })
            const listaProjetos = prisma.projeto.findMany({ where: { id_orientador: professor.id } })
            res.render('indexOrientador.ejs', {
                professor: professor,
                listaProjetos: listaProjetos
            })
            return;
        }
        case ADMINISTRADOR: {
            res.render('indexAdministrador.ejs', {})
            return;
        }
    }
})

router.get('/coordenador/alunos', loginService.checkToken, loginService.isAdmin, (req, res, next) => {
    const alunos = prisma.aluno.findMany();
    res.render('coordenadorAlunos.ejs', {
        alunos: alunos
    })
} )

module.exports = router