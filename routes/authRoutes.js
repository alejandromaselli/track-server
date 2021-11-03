const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = new User({email, password});
    await user.save();
    const token = jwt.sign({userId: user._id,}, 'MY_SECRET_KEY');
    res.send({token});
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

router.post('/signin', async (req, res) => {
  const {email, password} = req.body;
  console.log(req.body);
  if (!email || !password) return res.send({error: 'Must provide an email and password'})
  const user = await User.findOne({email});
  if (!user) return res.status(422).send({error: 'Email or password incorrect'});
  try {
    await user.comparePassword(password);
    const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
    return res.send({token})
  } catch (e) {
    return res.status(422).send({error: 'Email or password incorrect'})
  }
});

module.exports = router;