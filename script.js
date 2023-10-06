document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("task");
  const addTaskButton = document.getElementById("addTask");
  const taskCategory = document.getElementById("taskCategory");
  const newFolderNameInput = document.getElementById("newFolderName");
  const createFolderButton = document.getElementById("createFolder");

  loadTasksAndFolders();

  addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value;
    const category = taskCategory.value.toLowerCase();
    if (taskText.trim() === "" || category === "") return;

    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    const validateButton = document.createElement("button");
    validateButton.textContent = "Valider";
    validateButton.classList.add("validate-button");
    validateButton.addEventListener("click", function () {
      taskItem.classList.toggle("completed");
      saveTaskState(taskText, category, taskItem.classList.contains("completed"));
      saveTasksAndFolders();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function () {
      if (taskItem && taskItem.parentElement) {
        const taskDiv = taskItem.parentElement;
        taskDiv.parentElement.removeChild(taskDiv);
        removeTaskState(taskText, category);
        //updateTaskCount(taskDiv.parentElement);
        saveTasksAndFolders();
      }
    });

    const taskDiv = document.createElement("div");
    taskDiv.appendChild(taskItem);
    taskDiv.appendChild(validateButton);
    taskDiv.appendChild(deleteButton);

    const customFolderName = category.trim();
    const customFolderList = document.getElementById(
      customFolderName + "Tasks"
    );
    if (customFolderList) {
      const taskListDiv = customFolderList.querySelector("ul");
      taskListDiv.appendChild(taskDiv);
      //updateTaskCount(customFolderList);
      saveTaskState(taskText, customFolderName, false);
    } else {
      alert("Le dossier personnalisé n'existe pas.");
    }

    taskInput.value = "";
    saveTasksAndFolders();
  });

  createFolderButton.addEventListener("click", function () {
    const folderName = newFolderNameInput.value.trim().toLowerCase();
    if (folderName === "") return;

    const newTaskListDiv = document.createElement("div");
    newTaskListDiv.classList.add("task-list");
    newTaskListDiv.id = folderName + "Tasks";

    const folderTitle = document.createElement("h2");
    folderTitle.textContent = newFolderNameInput.value.trim();

    const folderTaskList = document.createElement("ul");

    const taskCount = document.createElement("span");
    taskCount.classList.add("task-count");
    taskCount.textContent = "0 tâche(s)";

    newTaskListDiv.appendChild(folderTitle);
    newTaskListDiv.appendChild(folderTaskList);
    newTaskListDiv.appendChild(taskCount);

    document.querySelector(".todo-app").appendChild(newTaskListDiv);

    newFolderNameInput.value = "";

    const selectElement = document.getElementById("taskCategory");

    const option = document.createElement("option");
    option.value = folderName;
    option.textContent = folderTitle.textContent;
    selectElement.appendChild(option);
    saveTasksAndFolders();
  });

  // Fonction pour charger les tâches et les dossiers depuis le localStorage
  function loadTasksAndFolders() {
    const savedData = localStorage.getItem("taskData");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const selectElement = document.getElementById("taskCategory");

      parsedData.forEach(function (data) {
        const folderName = data.folderName;
        const tasks = data.tasks;

        const newTaskListDiv = document.createElement("div");
        newTaskListDiv.classList.add("task-list");
        newTaskListDiv.id = folderName + "Tasks";

        const taskCount = document.createElement("span");
        taskCount.classList.add("task-count");
        taskCount.textContent = "0 tâche(s)";

        const folderTitle = document.createElement("h2");
        folderTitle.textContent = folderName;

        const folderTaskList = document.createElement("ul");

        

        newTaskListDiv.appendChild(folderTitle);
        newTaskListDiv.appendChild(folderTaskList);
        newTaskListDiv.appendChild(taskCount);

        document.querySelector(".todo-app").appendChild(newTaskListDiv);

        const option = document.createElement("option");
        option.value = folderName;
        option.textContent = folderTitle.textContent;
        selectElement.appendChild(option);

        tasks.forEach(function (taskText) {
          const taskItem = document.createElement("li");
          taskItem.textContent = taskText;
       

          const taskDiv = document.createElement("div");
          taskDiv.appendChild(taskItem);

          const taskStateKey = folderName + taskText;
          const taskState = localStorage.getItem(taskStateKey);
          if (taskState) {
            const { completed } = JSON.parse(taskState);
            if (completed) {
              taskItem.classList.add("completed");
            }
          }
          
          folderTaskList.appendChild(taskDiv);
        });
        //updateTaskCount(newTaskListDiv);
      });
    }
  }

  // Fonction pour sauvegarder les tâches et les dossiers dans le localStorage
  function saveTasksAndFolders() {
    const taskLists = document.querySelectorAll(".task-list");
    const dataToSave = [];

    taskLists.forEach(function (taskList) {
      const folderName = taskList.id.replace("Tasks", "");
      const tasks = [];

      const taskItems = taskList.querySelectorAll("li");
      taskItems.forEach(function (taskItem) {
        tasks.push(taskItem.textContent);
      });

      dataToSave.push({ folderName, tasks });
    });

    localStorage.setItem("taskData", JSON.stringify(dataToSave));
  }

  

  // Fonction pour sauvegarder l'état d'une tâche dans le localStorage
  function saveTaskState(taskText, folderName, completed) {
    const taskStateKey = folderName + taskText;
    localStorage.setItem(taskStateKey, JSON.stringify({ completed }));
  }

  // Fonction pour supprimer l'état d'une tâche dans le localStorage
  function removeTaskState(taskText, folderName) {
    const taskStateKey = folderName + taskText;
    localStorage.removeItem(taskStateKey);
  }

  /*// Fonction pour mettre à jour le compteur de tâches dans un dossier
  function updateTaskCount(taskList) {
    const taskCountElement = taskList.querySelector(".task-count");
    if (taskCountElement) {
      const taskItems = taskList.querySelectorAll("li");
      taskCountElement.textContent = taskItems.length + " tâche(s)";
    } else {
      // Si vous souhaitez soustraire le nombre de tâches, vous devez définir une valeur de départ
      // Par exemple, si vous avez 10 tâches au départ et en retirez 2, vous pouvez faire ceci :
      const initialTaskCount = 1;
      taskCountElement.textContent = (initialTaskCount + taskItems.length) + " tâche(s)";
      // Cependant, vous devrez adapter cela en fonction de votre application.
      // Si vous voulez simplement effacer le contenu lorsque taskCountElement est absent, utilisez ceci :
      taskCountElement.textContent = ""; 
    }
  }
  */
  
});


function completeTask(button) {
  const listItem = button.parentElement.parentElement;
  listItem.classList.add("completed");
  saveData();
}


function deleteTask(button) {
  const listItem = button.parentElement.parentElement;
  listItem.remove();
  saveData();
}

function saveData() {
  const taskList = document.getElementById("task-list");
  localStorage.setItem("task-list", taskList.innerHTML);
}

function loadSavedData() {
  const taskList = document.getElementById("task-list");
  const savedData = localStorage.getItem("task-list");
  if (savedData) {
      taskList.innerHTML = savedData;
  }
}

// Charger les données enregistrées au chargement de la page
loadSavedData();

