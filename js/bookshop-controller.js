'use strict'

function onInit() {
    bookShopServiceInit();
    renderBooks();
}

function renderBooks() {
    var books = getBooksToDisplay();
    console.log('the books', books)

    var strHTML = books.map(function(book) {
        return `<tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.price}$</td>
                <td>
                    <button class="read-button" onclick="onReadBook(${book.id})">Read</button>        
                    <button class="update-button" onclick="onUpdateClick(${book.id})">Update</button>        
                    <button class="delete-button" onclick="onRemoveBook(${book.id})">Delete</button>
                </td>
                </tr>
        `
    });
    console.log('the books on render', books);
    var elBooksTable = document.querySelector('.books-table-body');
    elBooksTable.innerHTML = strHTML.join('');
}

// UPDATE
function onUpdateClick(bookId) {
    var newPrice = +prompt('Enter New Price.')
    updateBookPrice(bookId, newPrice);
    renderBooks();
}

function onReadBook(bookId) {
    // debugger
    var book = getBookById(bookId)
    console.log('the books on', book)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.name
    elModal.querySelector('h6').innerText = book.price + '$'
    elModal.querySelector('h3').innerText = book.rate
    elModal.querySelector('p').innerText = 'Summary: ' + book.desc
    elModal.querySelector('a').innerHTML = `<img src="img/${book.imgUrl}.jpg"/>`
    elModal.hidden = false;
}

// Add new book
function onAddBook() {
    var elBookName = document.querySelector('input[name=name]')
    var elBookPrice = document.querySelector('input[name=price]')
    var elBookImage = document.querySelector('input[name=image]')
    console.log('Clicked worked?', elBookName, elBookPrice, elBookImage)
    var bookName = elBookName.value;
    var price = +elBookPrice.value;
    var imgUrl = elBookImage.value;
    addBook(bookName, imgUrl, price);
    renderBooks();
}

function onRemoveBook(bookId) {
    confirm('Do you really want to delete this book?')
    deleteBook(bookId);
    renderBooks();
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}