const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const Validator = require('validator')

const User = require('../../models/user')

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

router.get('/test', (req, res) => res.json({msg: 'works'}))

router.post('/register', (req, res) => {
    let errors = {}

    if(!Validator.isEmail(req.body.email)) {
      return res.status(400).send('Bad email')
    }

    if(Validator.isEmpty(req.body.email)) {
      return res.status(400).send('No email')
    }

    if(Validator.isEmpty(req.body.password)) {
      return res.status(400).send('No password')
    }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
    }

    else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      })

      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

router.post('/login', (req, res) => {
let errors = {}

  const email = req.body.email
  const password = req.body.password

  User.findOne({ email }).then(user => { 
    if (!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors)
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, email: user.email} 

        jwt.sign(
          payload,
          "todoS",
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
              email: user.email,
              id: user.id
            })
          }
        )
      } else {
        errors.password = 'Password incorrect'
        return res.status(400).json(errors)
      }
    })
  })
})

module.exports = router;
