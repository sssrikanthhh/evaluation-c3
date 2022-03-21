const express = require('express');

const connectDB = require('./configs/db');
const userController = require('./controllers/user.controllers');
const bookController = require('./controllers/book.controllers');
const commentController = require('./controllers/comment.controllers');
const loginController = require('./controllers/loginController');

const app = express();
const PORT = 8000;
app.use(express.json());

app.use('/users', userController);
app.use('/books', bookController);
app.use('/comments', commentController);
app.use('/login', loginController);
connectDB();

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});