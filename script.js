// Sélection des éléments HTML
let inputText = document.getElementById("inputText");
let list = document.getElementById("list");
let addButton = document.getElementById("addButton");
let taskCardSelector = document.getElementById("taskCardSelector");
let radialMenu = document.createElement("div");

// Options du menu radial
const radialOptions = [
    { text: "Éditer", action: editTask },
    { text: "Supprimer", action: deleteTask },
    { text: "Cocher", action: toggleChecked },
    { text: "Mettre en urgent", action: markUrgent }
];

// Crée et affiche le menu radial au clic sur une tâche
function showRadialMenu(e) {
    // Efface le menu précédent s'il existe
    radialMenu.innerHTML = "";
    
    // Crée les boutons du menu radial
    radialOptions.forEach(option => {
        let button = document.createElement("button");
        button.textContent = option.text;
        button.addEventListener("click", option.action);
        radialMenu.appendChild(button);
    });

    // Positionne le menu radial à l'emplacement du clic
    radialMenu.style.position = "absolute";
    radialMenu.style.left = e.pageX + "px";
    radialMenu.style.top = e.pageY + "px";

    // Affiche le menu radial
    document.body.appendChild(radialMenu);

    // Clique en dehors du menu pour le fermer
    document.addEventListener("click", closeRadialMenu);
}

// Ferme le menu radial
function closeRadialMenu() {
    if (radialMenu.parentNode) {
        radialMenu.parentNode.removeChild(radialMenu);
    }
    document.removeEventListener("click", closeRadialMenu);
}

// Ajoute une tâche à la liste
function addTask() {
    if (inputText.value === "") {
        alert("Veuillez insérer une nouvelle tâche !");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputText.value;
        li.addEventListener("click", showRadialMenu);
        list.appendChild(li);
    }
    inputText.value = "";
    saveData();
}

// Édite une tâche
function editTask() {
    // Vous pouvez implémenter la logique d'édition ici
    alert("Édition de la tâche...");
}

// Supprime une tâche
function deleteTask() {
    let listItem = radialMenu.parentElement;
    if (listItem && listItem.parentNode === list) {
        list.removeChild(listItem);
        saveData();
    }
}

// Coche/Décoche une tâche
function toggleChecked() {
    let listItem = radialMenu.parentElement;
    if (listItem) {
        listItem.classList.toggle("checked");
        saveData();
    }
}

// Marque une tâche comme urgente
function markUrgent() {
    let listItem = radialMenu.parentElement;
    if (listItem) {
        // Ajoutez ici la logique pour marquer une tâche comme urgente
        alert("Marquer comme urgent...");
    }
}

// Sauvegarde les données dans le stockage local
function saveData() {
    localStorage.setItem("data", list.innerHTML);
}

// Restaure les données depuis le stockage local
function restoreData() {
    let savedData = localStorage.getItem("data");
    if (savedData) {
        list.innerHTML = savedData;
        // Ajoutez des écouteurs d'événements aux éléments restaurés si nécessaire
        let listItems = list.getElementsByTagName("li");
        for (let i = 0; i < listItems.length; i++) {
            listItems[i].addEventListener("click", showRadialMenu);
        }
    }
}

// Appel de la fonction pour restaurer les données au chargement de la page
restoreData();
