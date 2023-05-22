const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes/routes.js'))

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor iniciado! Escutando a porta ${process.env.APP_PORT}`);
});