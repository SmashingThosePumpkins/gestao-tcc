const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SECRET_KEY = 'chave_secreta';

async function login(req, res) {
    try {
        const { login, senha } = req.body;
        const user = await prisma.usuario.findFirst({ where: { login } });
        if (!user || !bcrypt.compareSync(senha, user.senha)) {
            console.log("Usuário ou senha inválido.")
            return res.status(500).render('login.ejs', { error: 'Erro ao fazer login' });
        }

        const token = jwt.sign({ userId: user.id, userType: user.tipo }, SECRET_KEY, { expiresIn: '12h' });
        res.cookie.auth = token

        res.status(200).redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).render('login.ejs', { error: 'Erro ao fazer login' });
    }
};

function checkToken(req, res, next) {
    const token = res.cookie.auth
    jwt.verify(token, SECRET_KEY, function (err, decoded) {
        if (err || !decoded) {
            console.log("Usuário não autorizado, redirecionando para a página de login.")
            console.log("UserID -> " + res.locals.userId)
            return res.status(500).render('login.ejs', { error: 'Erro de autorização.' })
        }

        res.locals.userId = decoded.userId;
        res.locals.userType = decoded.userType;
        res.status(200);
        return next();
    })
}

module.exports = { login, checkToken }