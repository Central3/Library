const table = document.querySelector("table");
const tableBody = table.querySelector("tbody");
const bookTitle = document.querySelector("#title");
const addBookForm = document.querySelector(".add-book-form");
const bookAuthor = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#read");
const errorStatus = document.querySelector(".error");

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.name}`;
    }
}

class Library {
    #books = [];

    get books() {
        return this.#books;
    }

    addBookToLibrary(title, author, pages, read) {
        let newBook = new Book(title, author, pages, read);

        this.#books.push(newBook);
    }

    deleteBook(bookTitle) {
        this.#books.forEach((item, index) => {
            if (item.title === bookTitle) {
                this.#books.splice(index, 1);
            }
        });
    }
}

let newLibrary = new Library();

function displayLibrary() {
    clearDisplay();

    newLibrary.books.forEach((book, index) => {
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

function addDeleteBtn() {
    tableBody.childNodes.forEach((node) => {
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        let cell = node.insertCell();
        cell.appendChild(deleteBtn);
    });
}

displayLibrary();

function showError(message) {
    errorStatus.classList.add("active");
    errorStatus.textContent = message;
}

function clearError() {
    errorStatus.textContent = "";
    errorStatus.classList.remove("active");
}

bookTitle.addEventListener("input", () => {
    if (bookTitle.validity.tooShort) {
        showError("The title is too short.");
    } else {
        clearError();
    }
});

bookAuthor.addEventListener("input", () => {
    if (bookAuthor.validity.tooShort) {
        showError("Author name is too short.");
    } else {
        clearError();
    }
});

pages.addEventListener("input", () => {
    if (pages.validity.rangeUnderflow) {
        showError("Number of pages must be at least 1.");
    } else {
        clearError();
    }
});

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (bookTitle.validity.valueMissing) {
        showError("Please enter the book title.");
        bookTitle.reportValidity();
        return;
    }
    if (bookAuthor.validity.valueMissing) {
        showError("Please enter the book author.");
        bookAuthor.reportValidity();
        return;
    }

    if (
        bookTitle.validity.tooShort ||
        bookAuthor.validity.tooShort ||
        pages.validity.rangeUnderflow
    ) {
        return;
    }

    newLibrary.addBookToLibrary(
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
        let bookTitle =
            event.target.parentElement.parentElement.childNodes[1].textContent;
        newLibrary.deleteBook(bookTitle);
    }

    displayLibrary();
});
