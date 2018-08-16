const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    todos: {
        type: [todoSchema]
    }
})

module.exports = User = mongoose.model('user', userSchema)