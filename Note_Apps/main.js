const inputBox = document.getElementById('add-notes');
const listContainer = document.querySelector('.list-container');


function addNotes() {
    if (inputBox.value === ''){
        alert("You must write something !")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);  
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData()
}

listContainer.addEventListener("click", function(e){      //e = event yang sedang berlangsung, "d klik"
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");              //The toggle() method of the DOMTokenList interface removes an existing token from the list and returns false. If the token doesn't exist it's added and the function returns true.
        saveData()                                         //e.target mksdnya event.target ... "target" ada di dalam event
    }                                                       //.classList itu mksdnya list class apa saja yg dikenakan pada target ...cara cek bisa dengan console.log(e.target.classList)
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();                    //ketika sudah ketemu e.target, maka cari parentElementnya dan remove() itu
        saveData()
    } 
}, false)                                                   //false bukan nilai untuk "Else"


function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);        //"data" dalah key, dan listContainer.innerHTML adalah valuenya
}                                                                  //.setItem --> Save Data to Local Storage

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data")      //.getItem(key) --> Read Data from Local Storage
}

showTask()