const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name: String,
    price: Number
})

module.exports = mongoose.model('Products', productsSchema);