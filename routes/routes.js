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
                listaProjetos: listaProjetos,
                userInfo: res.cookie.decodedInfo
            })
            return;
        }
        case ORIENTADOR: {
            const professor = prisma.professor.findFirst({ where: { id_usuario: res.cookie.decodedInfo.userId } })
            const listaProjetos = prisma.projeto.findMany({ where: { id_orientador: professor.id } })
            res.render('indexOrientador.ejs', {
                professor: professor,
                listaProjetos: listaProjetos,
                userInfo: res.cookie.decodedInfo
            })
            return;
        }
        case ADMINISTRADOR: {
            res.render('indexAdministrador.ejs', {
                userInfo: res.cookie.decodedInfo
            })
            return;
        }
    }
})

router.get('/coordenador/alunos', loginService.checkToken, loginService.isAdmin, (req, res, next) => {
    const alunos = prisma.aluno.findMany();
    res.render('coordenadorAlunos.ejs', {
        alunos: alunos,
        userInfo: res.cookie.decodedInfo
    })
} )

router.get('/coordenador/orientadores', loginService.checkToken, loginService.isAdmin, (req, res, next) => {
    const orientadores = prisma.professor.findMany();
    res.render('coordenadorOrientadores.ejs', {
        orientadores: orientadores,
        userInfo: res.cookie.decodedInfo
    })
} )

router.get('/coordenador/projetos', loginService.checkToken, loginService.isAdmin, (req, res, next) => {
    const projetos = prisma.projeto.findMany();
    res.render('coordenadorProjetos.ejs', {
        projetos: projetos,
        userInfo: res.cookie.decodedInfo
    })
} )

router.get('/coordenador/cursos', loginService.checkToken, loginService.isAdmin, (req, res, next) => {
    const cursos = prisma.curso.findMany();
    res.render('coordenadorCursos.ejs', {
        cursos: cursos,
        userInfo: res.cookie.decodedInfo
    })
} )

router.get('/coordenador/projeto/:id', loginService.checkToken, loginService.isAdmin, (req, res, next) => {
    const id = req.params.id;
    const projeto = prisma.projeto.findFirst({ where: { id: id } })
    res.render('projeto.ejs', {
        projeto: projeto,
        userInfo: res.cookie.decodedInfo
    })
} )

module.exports = router