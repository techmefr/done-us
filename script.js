// Fonctions JS ToDo List

document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskCategory = document.getElementById("taskCategory");

    addTaskButton.addEventListener("click", function() {
        const taskText = taskInput.value;
        const category = taskCategory.value.toLowerCase();
        if (taskText.trim() === "" || category === "") return;

        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;

        // Début de la fonction pour supprimer les tâches

        let span = document.createElement("span");
        span.innerHTML="\u00d7";
        taskItem.appendChild(span);

        span.addEventListener ("click", function (e) {
            if (e.target.tagName === "SPAN") {
                e.target.parentElement.remove();
                saveData();
            }
            saveData ()
        }, false);

        // Fin de la fonction pour supprimer les tâches

        const taskDiv = document.createElement("div");
        taskDiv.appendChild(taskItem);  

        const customFolderName = category.trim();
        const customFolderList = document.getElementById(customFolderName + "Tasks");
        if (customFolderList) {
            const taskListDiv = customFolderList.querySelector("ul");
            taskListDiv.appendChild(taskDiv);
            taskInput.value = "";
            saveData ();
        } else {
            alert("Le dossier personnalisé n'existe pas.");
            saveData ();
        }

        taskInput.value = "";
        saveData ();
    });

    
        
    const newFolderNameInput = document.getElementById("newFolderName");
    const createFolderButton = document.getElementById("createFolder");
    const selectElement = document.getElementById("taskCategory");

    createFolderButton.addEventListener("click", function() {
        const folderName = newFolderNameInput.value.trim().toLowerCase();
        if (folderName === "") return;

        const newTaskListDiv = document.createElement("div");
        newTaskListDiv.classList.add("task-list");
        newTaskListDiv.id = folderName + "Tasks";

        // Début de la fonction pour supprimer les catégories

        let span = document.createElement("span");
        span.innerHTML="\u00d7";
        newTaskListDiv.appendChild(span);

        span.addEventListener ("click", function (e) {
            if (e.target.tagName === "SPAN") {
                e.target.parentElement.remove();
                saveData();
            }
        }, false);

         // Fin de la fonction pour supprimer les catégories

        const folderTitle = document.createElement("h2");
        folderTitle.textContent = newFolderNameInput.value.trim();

        const folderTaskList = document.createElement("ul");
        

        newTaskListDiv.appendChild(folderTitle);
        newTaskListDiv.appendChild(folderTaskList);

        document.querySelector(".todo-app").appendChild(newTaskListDiv);

        newFolderNameInput.value = "";

        const option = document.createElement("option");
        option.value = folderName;
        option.textContent = folderTitle.textContent;
        selectElement.appendChild(option);

    });
    saveData ();
});

// SAVES

function saveData () {
    localStorage.setItem("data", list.innerHTML);
}
function historyTasks () {
    list.innerHTML = localStorage.getItem("data");
}
historyTasks();

function myFunction() {
    alert("Votre message a bien été envoyé");
}

