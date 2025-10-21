const list = document.getElementById("list");
const textInput = document.getElementById("list-text-input");
const dateInput = document.getElementById("list-date-input");

const addBtn = document.getElementById("add-btn");

// adding elements
addBtn.addEventListener("click", function() {
    createElement(textInput.value, dateInput.value);
})

function createElement(text, date){
    let html = `<li class="list-element">
                    <p class="list-text roboto-normal">${text}</p>
                    <p class="list-date roboto-normal">${date}</p>
                    <button class="list-btn">DONE</button>
                </li>`
    const templateElement = document.createElement("template");
    templateElement.innerHTML = html;
    list.appendChild(templateElement.content.firstChild);
}

// removing elements
list.addEventListener("click", function() {
    if (event.target.classList.contains("list-btn")) {
        event.target.parentElement.remove();
    }
})