let myLibrary = [];
let libraryTable = document.querySelector("table");
let formActive = false;
let readBook = false;

//Books on intital load
let harryPotter = new Book("Harry Potter","J.K. Rowling", 672);
let theHobbit = new Book("The Hobbit","J.R.R Tolkien", 822);
let theStormlightArchive = new Book("The Way of Kings", "Brandon Sanderson", 1284);
myLibrary.push(harryPotter,theHobbit,theStormlightArchive);
displayBooks();

//Prototype Book
function Book(title,author,numPages,bookRead){
    //Constructor
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.bookRead = "No";

    //Methods
    this.info = function logInfo(){
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.bookRead}`
    }
}

//Functions
function addBookToLibrary(){
    newTitle = document.getElementById("new-title").value;
    newAuthor = document.getElementById("new-author").value;
    newPages = document.getElementById("new-pages").value;
    newQueryRead = document.getElementById("new-query-read").value;
    formActive = false;
    userForm.remove();
    newBook = new Book(newTitle,newAuthor,newPages,newQueryRead);
    myLibrary.push(newBook);
    tableRow = document.createElement("tr");
    libraryTable.appendChild(tableRow);
    displayDataRow(myLibrary.length-1,"title");
    displayDataRow(myLibrary.length-1,"author");
    displayDataRow(myLibrary.length-1,"numPages");
    displayDataRow(myLibrary.length-1,"bookRead");
    createDeleteButtons(myLibrary.length-1);
}

function createForm(){
    if(!formActive){
        userForm = document.createElement("form");
        createFormSection("Book Title:","Enter a title","new-title");
        createFormSection("Author:","Enter an author","new-author");
        createFormSection("Number of Pages:","Enter amount of pages","new-pages");
        createFormSection("Book Read?","Have you read it?","new-query-read");
        submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        submit.setAttribute("value", "Submit Book");
        submit.setAttribute("id", "submit-book");
        submit.setAttribute("onclick","addBookToLibrary()")
        userForm.appendChild(submit);
        body = document.querySelector("body");
        body.appendChild(userForm);
        formActive = true;
        }
}

function createFormSection(labelhead,placeholder,id){
    label = document.createElement("label");
    label.setAttribute("for",`${labelhead.toLowerCase().replace(/\s+/g, "-")}`)
    input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("value", `${placeholder}`);
    input.setAttribute("id", `${id}`);
    label.innerHTML = `${labelhead}`;
    userForm.appendChild(label);
    userForm.appendChild(input);
}

function displayBooks(){
    for(let book in myLibrary){
        tableRow = document.createElement("tr");
        libraryTable.appendChild(tableRow);
        displayDataRow(book,"title");
        displayDataRow(book, "author");
        displayDataRow(book, "numPages");
        displayDataRow(book, "bookRead");  
        createDeleteButtons(book); 
    }
}

function displayDataRow(book,tablehead){
    tableData = document.createElement("td");
    tableData.textContent = myLibrary[book][tablehead];
    tableRow.appendChild(tableData);
    tableRow.setAttribute("id",`${myLibrary[book].title}`)
    tableRow.setAttribute("class", "table-row")
}

function createDeleteButtons(book){
    createButton = document.createElement("button");
    createButton.innerText = "Delete"; 
    createButton.addEventListener('click',function(){
        selectedBook = this.parentElement.id;
        myLibrary = myLibrary.filter(x => x.title !== selectedBook);
        bookTableRow = document.getElementById(selectedBook); 
        bookTableRow.remove();
    })
    tableRow.appendChild(createButton);
}








