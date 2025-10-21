const list = document.getElementById("list");
const textInput = document.getElementById("list-text-input");
const dateInput = document.getElementById("list-date-input");

const addBtn = document.getElementById("add-btn");

const errText = document.getElementById("error-text");

// adding elements
addBtn.addEventListener("click", function() {
    if (textInput.value == "" || dateInput.value == "") {
        errText.style.visibility = "visible";
    }
    else {
        errText.style.visibility = "hidden";
        createElement(textInput.value, new Date(dateInput.value));
        storeItem(textInput.value, new Date(dateInput.value));
        textInput.value = "";
        dateInput.value = "";
    }
})

function createElement(text, date){
    let html = `<li class="list-element">
                    <p class="list-text roboto-normal">${text}</p>
                    <p class="list-date roboto-normal">${dateToString(date)}</p>
                    <button class="list-btn">DONE</button>
                </li>`
    const templateElement = document.createElement("template");
    templateElement.innerHTML = html;
    list.appendChild(templateElement.content.firstChild);
}

// removing elements
list.addEventListener("click", function(event) {
    if (event.target.classList.contains("list-btn")) {
        removeFromStorage(event.target.parentElement.querySelector(".list-text").textContent);
        event.target.parentElement.remove();
    }
})

// date operations
function dateToString(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// localStorage
function storeItem(text, date) {
    localStorage.setItem(text, date);
}

function loadData() {
    Object.keys(localStorage).forEach(key => {
        createElement(key, new Date(localStorage.getItem(key)));
    })
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

// main
errText.style.visibility = "hidden";
loadData();