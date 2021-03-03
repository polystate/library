let myLibrary = [];
let libraryTable = document.querySelector("table");
let formActive = false;
let bookID = 0;


//Books on intital load
let harryPotter = new Book("Harry Potter","J.K. Rowling", 672, false);
let theHobbit = new Book("The Hobbit","J.R.R Tolkien", 822, false);
let theStormlightArchive = new Book("The Way of Kings", "Brandon Sanderson", 1284, false);
myLibrary.push(harryPotter,theHobbit,theStormlightArchive);
displayBooks();

//Prototype Book
function Book(title,author,numPages,isBookRead){
    //Constructor
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isBookRead = isBookRead;
    this.bookRead = "No";

    //Methods
    this.info = function logInfo(){
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.bookRead}`
    }
    this.createID = function createNewID(){
        console.log(`${this.title}'s ID is ${bookID}`);
        bookID++;
        return `${this.currentID = bookID-1}`;
    }
}

//Functions
function addBookToLibrary(){
    newTitle = document.getElementById("new-title").value;
    newAuthor = document.getElementById("new-author").value;
    newPages = document.getElementById("new-pages").value;
    formActive = false;
    userForm.remove();
    newBook = new Book(newTitle,newAuthor,newPages,false);
    myLibrary.push(newBook);
    myLibrary[myLibrary.length-1].createID();
    tableRow = document.createElement("tr");
    libraryTable.appendChild(tableRow);
    displayDataRow(myLibrary.length-1,"title");
    displayDataRow(myLibrary.length-1,"author");
    displayDataRow(myLibrary.length-1,"numPages");
    displayDataRow(myLibrary.length-1,"bookRead");
    createReadButtons();
    createDeleteButtons();
}

function createForm(){
    if(!formActive){
        userForm = document.createElement("form");
        createFormSection(undefined,undefined,undefined,true);
        createFormSection("Book Title:","Enter a title","new-title");
        createFormSection("Author:","Enter an author","new-author");
        createFormSection("Number of Pages:","Enter amount of pages","new-pages");
        createFormSection("Book Read?","Have you read it?","new-query-read");
        submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        submit.setAttribute("value", "Submit Book");
        submit.setAttribute("id", "submit-book");
        submit.setAttribute("onclick","addBookToLibrary()");
        hide = document.createElement("input");
        hide.setAttribute("type","button");
        hide.setAttribute("id","hide-button");
        hide.setAttribute("value", "Hide");
        hide.setAttribute("onclick", "hideForm()");
        userForm.appendChild(submit);
        userForm.appendChild(hide);
        body = document.querySelector("body");
        body.appendChild(userForm);
        formActive = true;
        }
}

function createFormSection(labelhead,placeholder,id,header){
    if(header){
        headerText = document.createElement("p");
        idText = document.createElement("p");
        headerText.setAttribute("id","library-card");
        idText.setAttribute("id","id-text");
        headerText.innerText = "Library Card";
        idText.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: #${generateRandomID(10)}`;
        userForm.appendChild(idText);
        userForm.appendChild(headerText);
        return;
    }
    label = document.createElement("label");
    label.setAttribute("for",`${labelhead.toLowerCase().replace(/\s+/g, "-")}`)
    input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("value", `${placeholder}`);
    input.setAttribute("id", `${id}`);
    input.setAttribute("class", "input-fields")
    label.innerHTML = `${labelhead}`;
    userForm.appendChild(label);
    userForm.appendChild(input);
}

function displayBooks(){
    for(let book in myLibrary){
        myLibrary[book].createID(); 
        tableRow = document.createElement("tr");
        libraryTable.appendChild(tableRow);
        displayDataRow(book,"title");
        displayDataRow(book, "author");
        displayDataRow(book, "numPages");
        displayDataRow(book, "bookRead");  
        createReadButtons();
        createDeleteButtons();
    }
}

function displayDataRow(book,tablehead){
    tableData = document.createElement("td");
    tableData.setAttribute("class",`${tablehead}`)
    tableData.textContent = myLibrary[book][tablehead];
    tableRow.appendChild(tableData);
    tableRow.setAttribute("id",`${myLibrary[book].currentID}`)
    tableRow.setAttribute("class", "table-row")
}

function createDeleteButtons(){
    deletebutton = document.createElement("button");
    deletebutton.setAttribute("class", "actionbuttons")
    // deletebutton.style = "font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; font-size: 1rem;"
    deletebutton.innerText = "Delete"; 
    deletebutton.addEventListener('click',function(){
        selectedBook = this.parentElement.id;
        index = myLibrary.findIndex(x => x.currentID == selectedBook);
        myLibrary = myLibrary.filter(x => x.currentID != selectedBook);
        bookTableRow = document.getElementById(selectedBook); 
        bookTableRow.remove();
    })
    tableRow.appendChild(deletebutton);
}

function createReadButtons(){
    readbutton = document.createElement("button");
    readbutton.setAttribute("class", "actionbuttons");
    
    readbutton.innerText = "I read it"; 
    readbutton.addEventListener('click',function(){
        selectedBook = this.parentElement.id;
        index = myLibrary.findIndex(x => x.currentID == selectedBook);
        
        if(!myLibrary[index].isBookRead){
            this.parentElement.childNodes[this.parentElement.childNodes.length-3].textContent = "Yes";
            myLibrary[index].bookRead = "Yes";
            this.innerText = "Not read"
        } else {
            this.parentElement.childNodes[this.parentElement.childNodes.length-3].textContent = "No";
            myLibrary[index].bookRead = "No";
            this.innerText = "I read it"
        }
        myLibrary[index].isBookRead = !myLibrary[index].isBookRead;
    })
    tableRow.appendChild(readbutton);
}

function hideForm(){
    formActive = false;
    userForm.remove();
}

function generateRandomID(amount){
    randomArr = [];
    randomArr.push(bookID);
    for(let i = 0; i < amount-1; i++){
        randomArr.push(Math.round(Math.random()*amount-1));
    }
    return randomArr.join("");
}





