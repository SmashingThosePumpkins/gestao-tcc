const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes/routes.js'))
app.use('/api', require('./routes/api/api.js'))

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor iniciado! Escutando a porta ${process.env.APP_PORT}`);
});