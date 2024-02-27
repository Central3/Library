const table = document.querySelector("table");
const tableBody = table.querySelector("tbody");
const addBtn = document.querySelector(".add-btn");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#read");

const myLibrary = [];

const Book = function (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.info = function () {
    return `${this.name}`;
};

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);
}

function displayLibrary() {
    /* TODO:
        1. Add a checkbox for the last column (Read status)
    */
    myLibrary.forEach((book, index) => {
        let row = tableBody.insertRow();
        let serialNumberCell = row.insertCell(0);
        serialNumberCell.innerHTML = index + 1;

        Object.keys(book).forEach((key) => {
            let cell = row.insertCell();
            cell.innerHTML = book[key];
        });
    });
}

function clearDisplay() {
    while (tableBody.firstChild) {
        tableBody.firstChild.remove();
    }
}

addBookToLibrary("Game of thrones", "George RR Martin", 596, true);
addBookToLibrary("The Shining", "Stephen King", 490, false);
addBookToLibrary("Gerald's game", "stephen king", 480, false);

displayLibrary();

addBtn.addEventListener("click", (event) => {
    event.preventDefault();

    addBookToLibrary(
        bookTitle.value,
        bookAuthor.value,
        pages.value,
        readStatus.checked
    );

    clearDisplay();
    displayLibrary();
});
