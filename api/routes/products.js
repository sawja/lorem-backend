
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Product.find()
    .select('-__v')
    .exec()
    .then(docs => {
        res.status(200).json(docs)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('-__v')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({
                    message: 'No valid entry for this id'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(
                {error: err}
            )
        })
})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price
    })

    product.save().then(result => {
        console.log(result)
    })
    .catch(error => console.log(error))
    
    res.status(201).json({
        message: 'handling POST request to /products',
        createdStudent: student
    })
})

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.remove({
        _id: id
    })
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {}

    for (const ops of req.body) {
        updateOps[ops.property] = ops.value
    }
    Product.update({
        _id: id
    }, 
    {
        $set: updateOps
    })
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router