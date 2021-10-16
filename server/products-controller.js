const express = require('express');
const router = express.Router();

const Product = require('./product');

router.post('/', (req, res)=>{
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    })

    product.save((err, product)=>{
        if(err){
            res.status(500).send(err);
        } else{
            res.status(200).send(product);
        }
    })
})

router.get('/', (req, res)=>{
    Product.find().exec((err, product)=>{
        if(err){
            res.status(500).send(err);
        } else{
            res.status(200).send(product);
        }
    })
})

router.get('/:id', (req, res)=>{
    Product.findById(req.params.id, (err, product)=>{
        if(err){
            res.status(500).send(err);
        } else if(!product){
            res.status(404).send({});
        } else{
            res.send(product);
        }
    })
})


router.delete('/:id', async(req, res)=>{
    try{
        await Product.deleteOne({_id: req.params.id})  
        res.status(200).send({})
    } catch(err){
        res.status(200).send({msg: 'Internal error', error: err})
    }
})

router.put('/:id', (req, res)=>{
    Product.findById(req.body._id, (err, product)=>{
        if(err){
            res.status(500).send(err)
        } else if(!product){
            res.status(404).send({})
        } else{
            product.name = req.body.name
            product.price = req.body.price
            product.save().then(product => res.status(200).send(product)).catch(err => res.status(500).send(err));
        }
    })
})

module.exports = router;