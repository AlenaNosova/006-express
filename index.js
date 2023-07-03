const express = require('express');
const { v4: uuid } = require('uuid');

const logger = require('./middleware/logger');
const err404 = require('./middleware/err-404');
const indexRouter = require('./routes/router');
const booksRouter = require('./routes/booksRouter');

class Book {
  constructor(
    title = "",
    description = "",
    authors = "",
    favorite = "",
    fileCover = "",
    fileName = "",
    fileBook = ""
  ) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
  }
}

// Пример базы данных книг
const books = {
  book:[
    new Book(
      "Book 1",
      "Description 1",
      "Author 1",
      "Favorite 1",
      "Cover 1",
      "File 1"
      ),
    new Book(
      "Book 2",
      "Description 2",
      "Author 2",
      "Favorite 2",
      "Cover 2",
      "File 2"
      ),
  ]
};

const users = {
  user: [
    { id: 1, email: "test@mail.ru", password: "password1" },
  ]
}

const app = express();
const router = express.Router();

// Метод POST для авторизации пользователя
app.post('/api/user/login', (req, res) => {
  const { user } = users;
 
  res.status(201).json(user);
});

// Метод GET для получения всех книг
router.get('/api/books', (req, res) => {
  const { book } = books;
  res.json(book);
});

// Метод GET для получения книги по ID
router.get('/api/books/:id', (req, res) => {
  const { book } = books;
  const { id } = req.params;
  const idx = book.findIndex(el => el.id === id);

  if (idx !== -1) {
    res.json(book[idx]);
  } else {
    res.status(404).json({error: '404 | Книга не найдена'})
  }
});

// Метод POST для создания книги
router.post('/api/books', (req, res) => {
  const { book } = books;
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
  
  const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook); 
  book.push(newBook);

   res.status(201).json(newBook);
});

// Метод PUT для редактирования книги по ID
router.put('/api/books/:id', (req, res) => {
  const { book } = books;
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
  const { id } = req.params;
  const idx = book.findIndex(el => el.id === id);

  if (idx !== -1) {
    book[idx] = {
      ...book[idx], 
      title, 
      description, 
      authors, 
      favorite, 
      fileCover, 
      fileName,
      fileBook
    };
    res.json(book[idx]);
  } else {
    res.status(404).json({error: '404 | Книга не найдена'});
  }
});

// Метод DELETE для удаления книги по ID
router.delete('/api/books/:id', (req, res) => {
  const { book } = books;
  const { id } = req.params;
  const idx = book.findIndex(el => el.id === id);

  if (idx !== -1) {
    book.splice(idx, 1);
    res.json({message: 'ok'});
  } else {
    res.status(404).json({error: '404 | Книга не найдена'});
  }
});

// Подключение middleware к приложению
app.use(logger);
app.use(err404);
app.use('/', indexRouter)

// Подключение routes к приложению
app.use('/', router);
app.use('/booksRouter', booksRouter);

// Подключение публичного роутера 
app.use('/public', express.static(__dirname + '/public'))

// Запуск сервера
const PORT = process.env.PORT || 3000
app.listen(PORT);
