'use strict'

const KEY = 'books';
const PAGE_SIZE = 10;
var gBooks;
var gPageIdx = 0;
var gNextId = 1;

function bookShopServiceInit() {
    _createBooks();
}



function _createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || books.length === 0) {
        books = [{
                id: gNextId++,
                name: 'Gary Plonter And the Chamber is Snickers',
                price: 20,
                imgUrl: '1',
                desc: makeLorem(),
                rate: 2
            },
            {
                id: gNextId++,
                name: 'Dany Ronder And the Prisoner from Pakistan',
                price: 25,
                imgUrl: '2',
                desc: makeLorem(),
                rate: 5
            },
            {
                id: gNextId++,
                name: 'Samy Sooner And the Order of the Philips',
                price: 30,
                imgUrl: '3',
                desc: makeLorem(),
                rate: 3
            }
        ];

    }
    console.log(_createBooks)
    gBooks = books;
    _saveBooksToStorage();
}
// Create book
function _createBook(bookName, imgUrl, price) {
    return {
        id: gNextId++,
        name: bookName,
        price: price ? price : getRandomIntInclusive(10, 100),
        imgUrl: imgUrl ? imgUrl : '../img/empty.jpg',
        desc: makeLorem(100),
        rate: 0
    }
}
// Create
function addBook(book, imgUrl, price) {
    if (!book) book = _createBook();
    book.price = price;
    book.imgUrl = imgUrl;
    gBooks.unshift(book);
    _saveBooksToStorage();
}

// Read
function getBookById(bookId) {
    console.log(bookId)
    var book = gBooks.find(function(book) {
        return bookId === book.id;
    })
    return book;
}

// Update Price
function updateBookPrice(bookId, newPrice) {
    var book = gBooks.find(function(book) {
        return bookId === book.id;
    })
    book.price = newPrice;
    _saveBooksToStorage()
}

// Delete
function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id;
    });
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function getBooksToDisplay() {
    console.dir('Books to display:', gBooks)
    return gBooks;
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}