const express = require ('express');
require('express-async-errors');
const path = require('path');
const routes = require('./routes')
const app = express();
const cors = require('./app/controllers/middlewares/cors');
app.use(cors)
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));


app.listen(3000,()=> console.log('servidor iniciado em http://localhost:3000'))


