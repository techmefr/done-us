let inputText = document.getElementById("inputText");
let list = document.getElementById("list");

function addTasks () {
    if (inputText.value === "") {
        alert("Veuillez insérer une nouvelle tâche !")
    }

    else {
        let li = document.createElement("li");
        li.innerHTML=inputText.value;
        list.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    inputText.value = "";
    saveData ();
}

list.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData ();
    }
    
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData ();
    }
}, false);

function saveData () {
    localStorage.setItem("data", list.innerHTML);
}

function historyTasks () {
    list.innerHTML = localStorage.getItem("data");
}

historyTasks();