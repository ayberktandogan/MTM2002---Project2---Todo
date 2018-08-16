const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken');


const User = require('../../models/user')

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

router.post('/add/:id', (req, res) => {
    //:id is user's id
    let errors = {}
    let isValid = true
    if(isEmpty(req.body.text)){
        errors.text = 'Text girmeniz lazım'
        isValid = false
    }
    if(passport.authenticate('jwt', {session: false}) && isValid)
    {User.findByIdAndUpdate(req.params.id, {$push: {todos: req.body}}, {safe: true, upsert: true}, (err, resp) => {
        if (err) res.status(500).json(err)

        res.status(200).send(resp)
    })}
})

router.post('/delete/:id', (req, res) => {
    let errors
    User.findByIdAndUpdate(req.params.id, {$pull: {todos: req.body}}, {safe: true}, (err, resp) => {
        if (err) {res.send(500).json({error: 'Internal error'})}

        res.status(200).send(resp)
    })
})

router.get("/:id", (req, res) => {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(500).send('Kullanıcı bulunamadı');
        } else {
          res.json({
            todos: user.todos
          });
        }
      })
      .catch(err => console.log(err));
  });

module.exports = router