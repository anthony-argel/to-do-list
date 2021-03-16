import {domMaker} from './scripts/dommaker.js';
import {Project} from './scripts/project.js';
import {ToDo} from './scripts/todo.js';
import {session} from './scripts/session.js';

let currentSession = session();
let projects = [];
let currentProjectInd = 0;
let currentTodoInd = 0;
let todaysDate = "";


let startup = () => {
    if(projects.length == 0 && currentSession.hasData()) {
        projects = currentSession.loadProjects();
    }
    else {
        let defaultProj = new Project("default", "This is a test project", 0);
        projects.push(defaultProj);
    }
}

let getTodaysDate = () => {
    let d = new Date();
    todaysDate = d.getFullYear() + "-" + (d.getMonth()+1) +"-" + d.getDate();
    console.log(todaysDate);
}

let cancel = () => {
    let addBox = document.getElementById("add-content-bg");
    addBox.classList.add("hidden");
   
    if(!document.getElementById("add-project").classList.contains("hidden")) {
        resetAddProject();
        document.getElementById("add-project").classList.add("hidden");
    }
    if (!document.getElementById("add-todo").classList.contains("hidden")) {
        resetAddTodo();
        document.getElementById("add-todo").classList.add("hidden");
    }
}

let resetAddProject = () => {
    document.getElementById("proj-name").value = "";
    document.getElementById("proj-description").value = "";
}

let resetAddTodo = () => {
    document.getElementById("todo-name").value = "";
    document.getElementById("todo-description").value = "";
    document.getElementById('todo-date').value = "";
    document.getElementById('todo-prio').value = "1";
}


let openAddProject = () => {
    let addBox = document.getElementById("add-content-bg");
    addBox.classList.remove("hidden");
    let addProj = document.getElementById("add-project");
    addProj.classList.remove("hidden");
    document.getElementById("add-project").querySelectorAll("button")[1].classList.add("hidden");
    document.getElementById("add-project").querySelectorAll("button")[0].classList.remove("hidden");
    document.getElementById("add-project").querySelector("p").textContent = "Create New Project";
}

let openEditProject = () => {
    let addBox = document.getElementById("add-content-bg");
    addBox.classList.remove("hidden");
    let addProj = document.getElementById("add-project");
    addProj.classList.remove("hidden");
    document.getElementById("add-project").querySelectorAll("button")[1].classList.remove("hidden");
    document.getElementById("add-project").querySelectorAll("button")[0].classList.add("hidden");
    document.getElementById("add-project").querySelector("p").textContent = "Edit Project";

    document.getElementById("proj-name").value = projects[currentProjectInd].getName();
    document.getElementById("proj-description").value = projects[currentProjectInd].getDescription();
}

let addProject = () => {
    let name = document.getElementById("proj-name").value.trim();
    let description = document.getElementById("proj-description").value.trim();
    if(name === "") {
        showAlert("Please enter a project name.");
    }
    else {
        let p1 = new Project(name, description, projects.length);
        projects.push(p1);
        updateTodoSystem();
        cancel();
    }
}

let saveProjectEdit = () => {
    let name = document.getElementById("proj-name").value.trim();
    let description = document.getElementById("proj-description").value.trim();
    if(name === "") {
        showAlert("Please enter a project name.");
    }
    else {
        projects[currentProjectInd].setName(name);
        projects[currentProjectInd].setDescription(description);
        updateTodoSystem();
        cancel();
    }
}

let openAddToDo = () => {
    let addBox = document.getElementById("add-content-bg");
    addBox.classList.remove("hidden");
    let addProj = document.getElementById("add-todo");
    addProj.classList.remove("hidden");
    document.getElementById("add-todo").querySelectorAll("button")[1].classList.add("hidden");
    document.getElementById("add-todo").querySelectorAll("button")[0].classList.remove("hidden");
}

let openEditTodo = (e) => {
    currentTodoInd = e.currentTarget.getAttribute("data-todoid");
    let addBox = document.getElementById("add-content-bg");
    addBox.classList.remove("hidden");
    let addProj = document.getElementById("add-todo");
    addProj.classList.remove("hidden");

    document.getElementById("todo-name").value = projects[currentProjectInd].getToDo(currentTodoInd).getTitle();
    document.getElementById("todo-description").value = projects[currentProjectInd].getToDo(currentTodoInd).getDescription();
    document.getElementById("todo-prio").value = +projects[currentProjectInd].getToDo(currentTodoInd).getPriority();
    document.getElementById("todo-date").value = projects[currentProjectInd].getToDo(currentTodoInd).getDate();

    document.getElementById("add-todo").querySelectorAll("button")[1].classList.remove("hidden");
    document.getElementById("add-todo").querySelectorAll("button")[0].classList.add("hidden");
    document.getElementById("add-todo").querySelector("p").textContent = "Edit To-do";
}

let addTodo = () => {
    let name = document.getElementById("todo-name").value.trim();
    let description = document.getElementById("todo-description").value.trim();
    let date = document.getElementById('todo-date').value;
    let priority = document.getElementById('todo-prio').value;
    let errorMsg = "Please enter ";
    let errorCount = 0;
    if(name === "") {
        errorMsg += "a name"
        errorCount++;
    }
    if(date == "") {
        if(errorCount == 1)
            errorMsg += " and";
        errorMsg += " a date";
        errorCount++;
    }
    errorMsg += ".";
    
    if(errorCount == 0) {
        let t1 = new ToDo(name, description, priority, date, projects[currentProjectInd].getLength());
        projects[currentProjectInd].addTodo(t1);
        updateTodoSystem();     
        cancel();
    }
    else {
        showAlert(errorMsg);
    }
}

let drawProjectList = () => {
    emptyChildNodesById("loadedprojects");

    let d = domMaker();
    for(let i = 0; i < projects.length; i++) {
        d.createProject(projects[i].getName(), projects[i].getID());
    }

    addProjectListListeners();
}

let addProjectListListeners = () => {
    let newProjects = Array.from(document.querySelectorAll("[data-projectid]"));
    for(let i = 0; i < newProjects.length; i++) {
        newProjects[i].addEventListener('click', loadCurrentProject);
    }
    let eraseIcons = Array.from(document.getElementsByClassName('project-erase'));
    for(let j = 0; j < eraseIcons.length; j++) {
        eraseIcons[j].addEventListener('click', eraseProject);
    }
    document.querySelector(`[data-projectid='${currentProjectInd}']`).classList.add("selected-proj");
}

let eraseProject = (e) => {
    let allProjects = Array.from(document.querySelectorAll("[data-projectid]"));
    let foundTarget = -1;
    for(let i = 0; i < allProjects.length; i++) {
        if(allProjects[i].contains(e.target) && foundTarget == -1) {
            foundTarget = true;
            foundTarget = i;
        }
        if(foundTarget != -1 && foundTarget != allProjects.length - 1){
            projects[i].setID(projects[i].getID() - 1);
            allProjects[i].dataset.projectid = projects[i].getID();
        }

    }
    if(foundTarget == currentProjectInd) {
        currentProjectInd = 0;
    }
    projects.splice(foundTarget, 1);
    allProjects.splice(foundTarget,1);
    document.querySelector(`[data-projectid='${foundTarget}']`).remove();
    updateTodoSystem();
    e.stopPropagation(); // prevent event listener bubbling to parents
}

let emptyChildNodesById = (parentId) => {
    let loadedProjects = document.getElementById(parentId);
    while(loadedProjects.hasChildNodes()) {
        loadedProjects.removeChild(loadedProjects.firstChild);
    }
}

let drawCurrentProject = () => {
    emptyChildNodesById("current-todos");
    document.getElementById("project-name").textContent = projects[currentProjectInd].getName();
    let d = domMaker();
    d.createToDos(projects[currentProjectInd].getTodos());
    addTodoListeners();
}

let loadCurrentProject = (e) => {
    document.querySelector(`[data-projectid='${currentProjectInd}']`).classList.remove("selected-proj");
    currentProjectInd = e.target.getAttribute("data-projectid");
    document.querySelector(`[data-projectid='${currentProjectInd}']`).classList.add("selected-proj");
    drawCurrentProject();
}

let addTodoListeners = () => {
    let allTodos = Array.from(document.querySelectorAll("[data-todoid]"));
    for(let i = 0; i < allTodos.length; i++) {
        allTodos[i].addEventListener('click', openEditTodo);
    }
    let allEraseIcons = Array.from(document.getElementsByClassName("todo-erase"));
    for(let j= 0; j < allEraseIcons.length; j++) {
        allEraseIcons[j].addEventListener('click', deleteItem);
    }
    let checkIcons = Array.from(document.getElementsByClassName('checkbox'));
    for (let k = 0; k < checkIcons.length; k++) {
        checkIcons[k].addEventListener('click', toggleCheckbox);
    }
}

let toggleCheckbox = (e) => {
    e.target.classList.toggle("checked");
    let allTodos = Array.from(document.querySelectorAll("[data-todoid]"));
    for(let i = 0; i < allTodos.length; i++) {
        if(allTodos[i].contains(e.target)) {
            allTodos[i].classList.toggle("completed-todo");
            projects[currentProjectInd].todos[i].setCompleted(!projects[currentProjectInd].todos[i].getCompleted());
            updateTodoSystem();
        }
    }
    e.stopPropagation(); // prevent event listener bubbling to parents
}

let showAlert = (text) => {
    document.getElementById("add-content-bg").classList.remove("hidden");
    document.getElementById("alert").classList.remove("hidden");
    document.getElementById("alert").querySelector("p").textContent = text;
}

let exitAlert = () => {
    document.getElementById("alert").classList.add("hidden");
}

let deleteItem = (e) => {
    let allTodos = Array.from(document.querySelectorAll("[data-todoid]"));
    for(let i = 0; i < allTodos.length; i++) {
        if(allTodos[i].contains(e.target)) {
            projects[currentProjectInd].removeTodo(allTodos[i].dataset.todoid);
            updateTodoSystem();
        }
    }
    e.stopPropagation(); // prevent event listener bubbling to parents
}

let updateTodoSystem = () => {
    drawProjectList();
    drawCurrentProject();
    currentSession.saveProjects(projects);
}


getTodaysDate();
startup();
drawProjectList();
drawCurrentProject();

document.getElementsByClassName("la-plus")[0].addEventListener('click', openAddProject);
document.getElementsByClassName("cancel-btn")[0].addEventListener('click', cancel);
document.getElementsByClassName("cancel-btn")[1].addEventListener('click', cancel);
document.getElementsByClassName("add-btn")[0].addEventListener('click', addProject);
document.getElementsByClassName("add-btn")[1].addEventListener('click', addTodo);
document.getElementsByClassName("edit-btn")[0].addEventListener('click', saveProjectEdit);
document.getElementsByClassName("la-plus-square")[0].addEventListener('click', openAddToDo);
document.getElementById("alert").querySelector("button").addEventListener('click', exitAlert);
document.getElementById("project-name").addEventListener('click', openEditProject);
//document.getElementById("today-btn").addEventListener('click', showToday);