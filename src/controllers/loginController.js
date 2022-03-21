const router = require('express').Router();

const User = require('../models/user.models');

router.post('/', async (req, res) => {
  try {
    let user = await User.find({ email: req.body.email });
    if (!user) {
      return res.status(401).send('email or password you entered is wrong!');
    }
    if (user.checkDetails(req.body.email, res.body.password)) {
      return res.status(400).send('wrong credentials!');
    }
    user = await User.find({ email: req.body.email });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
});

module.exports = router;