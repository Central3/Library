const table = document.querySelector("table");
const tableBody = table.querySelector("tbody");
const bookTitle = document.querySelector("#title");
const addBookForm = document.querySelector(".add-book-form");
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
    clearDisplay();

    myLibrary.forEach((book, index) => {
        let row = tableBody.insertRow();
        let serialNumberCell = row.insertCell(0);
        serialNumberCell.innerHTML = index + 1;

        Object.keys(book).forEach((key, index) => {
            let cell = row.insertCell();
            if (index === Object.keys(book).length - 1) {
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "read";
                checkbox.checked = book[key];
                cell.appendChild(checkbox);
            } else {
                cell.innerHTML = book[key];
            }
        });
    });

    addDeleteBtn();
}

function clearDisplay() {
    while (tableBody.firstChild) {
        tableBody.firstChild.remove();
    }
}

function deleteBook(ele) {
    let book = ele.parentElement.parentElement.childNodes[1].textContent;

    myLibrary.forEach((item, index) => {
        if (item.title === book) {
            myLibrary.splice(index, 1);
        }
    });

    displayLibrary();
}

function addDeleteBtn() {
    tableBody.childNodes.forEach((node) => {
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        let cell = node.insertCell();
        cell.appendChild(deleteBtn);
    });
}

addBookToLibrary("Game of thrones", "George RR Martin", 596, true);
addBookToLibrary("The Shining", "Stephen King", 490, false);
addBookToLibrary("Gerald's game", "stephen king", 480, false);

displayLibrary();

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    addBookToLibrary(
        bookTitle.value,
        bookAuthor.value,
        pages.value,
        readStatus.checked
    );

    addBookForm.reset();

    displayLibrary();
});

table.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        deleteBook(event.target);
    }
});
