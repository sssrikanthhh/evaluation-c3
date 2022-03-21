const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/user.models');
const uploads = require('../middlewares/uploads');

router.post('/',
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('first name cannot be empty')
    .isLength({ min: 3, max: 30 })
    .withMessage('first name should be minimum of 3 characters and maximum of 30 characters'),
  body('lastName')
    .isLength({ min: 3, max: 30 })
    .withMessage('last name should be minimum of 3 characters and maximum of 30 characters'),
  body('age')
    .isNumeric()
    .withMessage('age should be a number')
    .not()
    .isEmpty()
    .withMessage('age is required')
    .custom((value) => {
      if (value < 0 || value > 150) {
        throw new Error('age should be between 1 and 150');
      }
      return true;
    }),
  body('body')
    .isEmail()
    .withMessage('please provide valid email address')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('email is already taken, please provide a new email address');
      }
      return true;
    }),
  uploads.single('profileImages'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        profileImages: req.file.path,
      });
      return res.status(201).send(user);
    } catch (error) {
      return res.status(501).send({ err: error.message });
    }
  });



module.exports = router;