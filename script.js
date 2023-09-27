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
}

list.addEventListener("click", function (e) {
    if (e.target.tagName === "li") {
        e.target.classList.toggle("checked");
    }
    
    else if (e.target.tagName === "span") {
        e.target.parentElement.remove();
    }
}, false);