const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    index: { type: String, required: true },
    groupNumber: { type: Number, required: true },
    grades: [
        { type: Number }
    ]
})

module.exports = mongoose.model('Student', studentSchema)