const list = document.getElementById("list");
const textInput = document.getElementById("list-text-input");
const dateInput = document.getElementById("list-date-input");

const addBtn = document.getElementById("add-btn");

const errText = document.getElementById("error-text");

let curId = 0;

// adding elements
addBtn.addEventListener("click", function() {
    if (textInput.value == "" || dateInput.value == "") {
        errText.style.visibility = "visible";
    }
    else {
        errText.style.visibility = "hidden";
        createElement(textInput.value, dateInput.value, curId);
        storeItem(textInput.value, dateInput.value, curId);
        curId++;
        textInput.value = "";
        dateInput.value = "";
    }
})

function createElement(text, date, id){
    let html = `<li class="list-element">
                    <p class="list-text roboto-normal">${text}</p>
                    <p class="list-date roboto-normal">${dateToString(date)}</p>
                    <button id="${id}" class="list-btn">DONE</button>
                </li>`
    const templateElement = document.createElement("template");
    templateElement.innerHTML = html;
    list.appendChild(templateElement.content.firstChild);
}

// removing elements
list.addEventListener("click", function(event) {
    if (event.target.classList.contains("list-btn")) {
        removeFromStorage(event.target.id);
        event.target.parentElement.remove();
    }
})

// date operations
function dateToString(date) {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
}

// localStorage
function storeItem(text, date, id) {
    const item = {itemText: text, itemDate: date};
    localStorage.setItem(curId, JSON.stringify(item));
    localStorage.setItem("id", id);
}

function loadData() {
    Object.keys(localStorage).forEach(key => {
        if (key == "id") return;
        const item = JSON.parse(localStorage.getItem(key));
        createElement(item.itemText, item.itemDate);
    })
    curId = Number(localStorage.getItem("id"));
}

function removeFromStorage(id) {
    localStorage.removeItem(id);
}

// main
errText.style.visibility = "hidden";
loadData();