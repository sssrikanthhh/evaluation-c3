const router = require('express').Router();

const Comment = require('../models/comment.models');

router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    return res.status(201).send(comment);
  } catch (error) {
    return res.status(501).send({ err: error.message });
  }
});

module.exports = router;