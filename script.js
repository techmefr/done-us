// Fonctions JS ToDo List

document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("task");
  const addTaskButton = document.getElementById("addTask");
  const taskCategory = document.getElementById("taskCategory");

  addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value;
    const category = taskCategory.value.toLowerCase();
    if (taskText.trim() === "" || category === "") return;

    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    const taskDiv = document.createElement("div");
    taskDiv.appendChild(taskItem);

    const customFolderName = category.trim();
    const customFolderList = document.getElementById(
      customFolderName + "Tasks"
    );
    if (customFolderList) {
      const taskListDiv = customFolderList.querySelector("ul");
      taskListDiv.appendChild(taskDiv);
    } else {
      alert("Le dossier personnalisé n'existe pas.");
    }

    taskInput.value = "";
  });

  const newFolderNameInput = document.getElementById("newFolderName");
  const createFolderButton = document.getElementById("createFolder");
  const selectElement = document.getElementById("taskCategory");

  createFolderButton.addEventListener("click", function () {
    const folderName = newFolderNameInput.value.trim().toLowerCase();
    if (folderName === "") return;

    const newTaskListDiv = document.createElement("div");
    newTaskListDiv.classList.add("task-list");
    newTaskListDiv.id = folderName + "Tasks";

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
});

// SAVES

function saveData() {
  localStorage.setItem("data", list.innerHTML);
}
function historyTasks() {
  list.innerHTML = localStorage.getItem("data");
}
historyTasks();

function myFunction() {
  alert("Votre message a bien été envoyé");
}
