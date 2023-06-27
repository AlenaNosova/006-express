const express = require('express');
const { v4: uuid } = require('uuid');

class Book {
  constructor(
    title = "",
    description = "",
    authors = "",
    favorite = "",
    fileCover = "",
    fileName = ""
  ) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
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
app.use(express.json());

// Метод POST для авторизации пользователя
app.post('/api/user/login', (req, res) => {
  const { user } = users;
 
  res.status(201).json(user);
});

// Метод GET для получения всех книг
app.get('/api/books', (req, res) => {
  const { book } = books;
  res.json(book);
});

// Метод GET для получения книги по ID
app.get('/api/books/:id', (req, res) => {
  const { book } = books;
  const { id } = req.params;
  const idx = book.findIndex(el => el.id === id);

  if (idx !== -1) {
    res.json(book[idx]);
  } else {
    res.status(404).json('404 | Книга не найдена')
  }
});

// Метод POST для создания книги
app.post('/api/books', (req, res) => {
  const { book } = books;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  
  const newBook = new Book(title, description, authors, favorite, fileCover, fileName); 
  book.push(newBook);

   res.status(201).json(newBook);
});

// Метод PUT для редактирования книги по ID
app.put('/api/books/:id', (req, res) => {
  const { book } = books;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
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
      fileName
    };
    res.json(book[idx]);
  } else {
    res.status(404).json('404 | Книга не найдена');
  }
});

// Метод DELETE для удаления книги по ID
app.delete('/api/books/:id', (req, res) => {
  const { book } = books;
  const { id } = req.params;
  const idx = book.findIndex(el => el.id === id);

  if (idx !== -1) {
    book.splice(idx, 1);
    res.json('ok');
  } else {
    res.status(404).json('404 | Книга не найдена' );
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3000
app.listen(PORT);
