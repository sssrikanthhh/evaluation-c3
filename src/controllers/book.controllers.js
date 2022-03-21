const router = require('express').Router();

const Book = require('../models/book.models');
const uploads = require('../middlewares/uploads');
router.post('/', uploads.single('coverImage'), async (req, res) => {
  try {
    const book = await Book.create({
      likes: req.body.likes,
      coverImage: req.file.path,
      content: req.body.content
    });
    return res.status(201).send(book);
  } catch (error) {
    return res.status(501).send({ err: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const page = req.body.page || 1;
    const pageSize = req.body.page || 10;
    const skip = (page - 1) * pageSize;
    const books = await Book
      .find()
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec();
    return res.status(201).send(books);
  } catch (error) {
    return res.status(501).send({ err: error.message });
  }
});



module.exports = router;