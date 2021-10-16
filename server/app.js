const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3000;
const products = require('./products-controller');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


mongoose.connect('mongodb+srv://andremiranda:andremiranda@cluster0.qgbjc.mongodb.net/product?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/products', products)

app.listen(port, ()=>{
    console.log(`Rodando na porta ${port}.`);
})