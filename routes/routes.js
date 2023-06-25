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

router.get('/login', (req, res, next) => res.redirect('/'))
router.get('/logout', loginService.logout);

//
//
//
// Rotas para buscar páginas
//
//
//

router.get('/', loginService.checkToken, async (req, res) => {
    userType = res.cookie.decodedInfo.userType
    switch (userType) {
        case ALUNO: {
            const userId = res.cookie.decodedInfo.userId;
            const aluno = await prisma.aluno.findFirst({ where: { id_usuario: userId }, include: { Curso: true } })
            const listaAlunosProjeto = await prisma.alunosProjeto.findMany({
                where: {
                    Aluno: {
                        id_usuario: userId
                    }
                }, include: {
                    Projeto: true
                }
            });
            const listaProjetos = listaAlunosProjeto.map((projeto) => projeto.Projeto)
            res.render('indexAluno.ejs', {
                aluno: aluno,
                listaProjetos: listaProjetos,
                userInfo: res.cookie.decodedInfo
            })
            return;
        }
        case ORIENTADOR: {
            const userId = res.cookie.decodedInfo.userId;
            const professor = await prisma.professor.findFirst({
                where: {
                    id_usuario: userId
                },
                include: {
                    Usuario: true
                }
            })
            const listaProjetos = await prisma.projeto.findMany({ where: { id_orientador: professor.id } })
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

router.get('/coordenador/alunos', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    const alunos = await prisma.aluno.findMany({
        include: {
            Curso: true,
            Usuario: true
        }
    });

    const cursos = await prisma.curso.findMany({});

    res.render('coordenadorAlunos.ejs', {
        alunos: alunos,
        cursos: cursos,
        userInfo: res.cookie.decodedInfo
    })
})

router.get('/coordenador/orientadores', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    const orientadores = await prisma.professor.findMany({
        include: {
            Usuario: true
        }
    });
    res.render('coordenadorOrientadores.ejs', {
        orientadores: orientadores,
        userInfo: res.cookie.decodedInfo
    })
})

router.get('/coordenador/projetos', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    const projetos = await prisma.projeto.findMany();
    res.render('coordenadorProjetos.ejs', {
        projetos: projetos,
        userInfo: res.cookie.decodedInfo
    })
})

router.get('/coordenador/cursos', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    const cursos = await prisma.curso.findMany();
    res.render('coordenadorCursos.ejs', {
        cursos: cursos,
        userInfo: res.cookie.decodedInfo
    })
})

router.get('/projeto/:id', loginService.checkToken, async (req, res, next) => {
    const id = req.params.id;
    const projeto = await prisma.projeto.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            Alunos: {
                include: {
                    Aluno: true
                },
            },
            ProjetosArquivo: true
        }
    })
    res.render('projeto.ejs', {
        projeto: projeto,
        userInfo: res.cookie.decodedInfo
    })
})

//
//
//
// Rotas de cadastro
//
//
//

router.post('/aluno', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    try {
        const { nome, ra, idCurso, termo, email } = req.body;

        await prisma.usuario.create({
            data: {
                login: email,
                senha: '1234',
                tipo: 0,
                Aluno: {
                    create: {
                        nome: nome,
                        ra: ra,
                        termo: parseInt(termo),
                        Curso: {
                            connect: {
                                id: parseInt(idCurso)
                            }
                        }
                    }
                },
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.redirect('/coordenador/alunos');
    }
});

router.post('/aluno/edit', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    try {
        const { id, nome, ra, idCurso, termo, email } = req.body;

        await prisma.aluno.update({
            where: {
                id: parseInt(id)
            },
            data: {
                nome: nome,
                ra: ra,
                termo: parseInt(termo),
                Usuario: {
                    update: {
                        login: email
                    }
                },
                Curso: { 
                    connect: { 
                        id: parseInt(idCurso) 
                    } 
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.redirect('/coordenador/alunos');
    }
});

router.get('/aluno/delete/:id', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    try {
        const id = req.params.id;
        await prisma.aluno.delete({ where: { id: parseInt(id) } })
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.redirect('/coordenador/alunos');
    }
});

router.post('/professor', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    try {
        const { nome, email } = req.body;

        await prisma.usuario.create({
            data: {
                login: email,
                senha: '1234',
                tipo: 1,
                Professor: {
                    create: {
                        nome: nome,
                    }
                },
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.redirect('/coordenador/orientadores');
    }
});

router.post('/professor/edit', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    try {
        const { id, nome, email } = req.body;

        await prisma.professor.update({
            where: {
                id: parseInt(id)
            },
            data: {
                nome: nome,
                Usuario: {
                    update: {
                        login: email
                    }
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.redirect('/coordenador/orientadores');
    }
});

router.get('/professor/delete/:id', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    try {
        const id = req.params.id;
        await prisma.professor.delete({ where: { id: parseInt(id) } })
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.redirect('/coordenador/orientadores');
    }
});

router.post('/projeto', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    try {
        const { nome, descricao, situacao } = req.body;

        await prisma.projeto.create({
            data: {
                nome: nome,
                descricao: descricao,
                status: parseInt(situacao)
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.redirect('/coordenador/projetos');
    }
});

router.post('/projeto/edit', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    try {
        const { id, nome, descricao, situacao } = req.body;

        await prisma.projeto.update({
            where: {
                id: parseInt(id)
            },
            data: {
                nome: nome,
                descricao: descricao,
                status: parseInt(situacao)
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.redirect('/coordenador/projetos');
    }
});

router.get('/projeto/delete/:id', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    try {
        const id = req.params.id;
        await prisma.projeto.delete({ where: { id: parseInt(id) } })
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.redirect('/coordenador/projetos');
    }
});

router.post('/curso', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    try {
        const { nome } = req.body;

        await prisma.curso.create({
            data: {
                nome: nome
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.redirect('/coordenador/cursos');
    }
});

router.post('/curso/edit', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    try {
        const { id, nome } = req.body;

        await prisma.curso.update({
            where: {
                id: parseInt(id)
            },
            data: {
                nome: nome
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.redirect('/coordenador/cursos');
    }
});

router.get('/curso/delete/:id', loginService.checkToken, loginService.isAdmin, async (req, res, next) => {
    try {
        const id = req.params.id;
        await prisma.curso.delete({ where: { id: parseInt(id) } })
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.redirect('/coordenador/cursos');
    }
});


module.exports = router