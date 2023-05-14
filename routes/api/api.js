const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router()

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.use((req, res, next) => {
    console.log(`API -> ${new Date().toUTCString()} - Carregando ${req.path}`)
    next()
})

router.use('/usuarios', require('./usuarios.js'));

const SECRET_KEY = 'chave_secreta';

router.post('/login', async (req, res) => {
    try {
        const { login, senha } = req.body;
        const user = await prisma.usuario.findFirst({ where: { login } });
        if (!user || !bcrypt.compareSync(senha, user.senha)) {
            return res.status(500).json({ error: 'Erro ao fazer login' });
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '12h' });
        res.status(200).json({ "login": login, "tipo": user.tipo, "token": token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

module.exports = router