
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Student = require('../models/student')

router.get('/', (req, res, next) => {
    Student.find()
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

router.post('/', (req, res, next) => {
    const student = new Student({
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        index: req.body.index,
        groupNumber: req.body.groupNumber,
        grades: req.body.grades
    })

    student.save().then(result => {
        console.log(result)
    })
    .catch(error => console.log(error))
    
    res.status(201).json({
        message: 'handling POST request to /students',
        createdStudent: student
    })
})

router.get('/:studentId', (req, res, next) => {
    const id = req.params.studentId;
    Student.findById(id)
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

router.delete("/:studentId", (req, res, next) => {
    const id = req.params.studentId;
    Student.remove({
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

router.patch("/:studentId", (req, res, next) => {
    const id = req.params.studentId;
    const updateOps = {}

    for (const ops of req.body) {
        updateOps[ops.property] = ops.value
    }

    Student.update({
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