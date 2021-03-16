import {domMaker} from './scripts/dommaker.js';
import {Project} from './scripts/project.js';
import {ToDo} from './scripts/todo.js';
import {session} from './scripts/session.js';

let currentSession = session();
let projects = [];
let currentProjectInd = 0;
let currentTodoInd = 0;

let startup = () => {
    if(projects.length == 0 && currentSession.hasData()) {
        console.log("loading data");
        projects = currentSession.loadProjects();
    }
    else {
        console.log("loading default setup");
        let defaultProj = new Project("default", "This is a test project", 0);
        projects.push(defaultProj);
    }
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
        drawProjectList();
        currentSession.saveProjects(projects);
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
        drawProjectList();
        drawCurrentProject();
        currentSession.saveProjects(projects);
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
        drawProjectList();
        drawCurrentProject();
        currentSession.saveProjects(projects);      
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

    // shouldn't be both drawing and creating on click events
    let newProjects = Array.from(document.querySelectorAll("[data-projectid]"));
    for(let i = 0; i < newProjects.length; i++) {
        newProjects[i].addEventListener('click', loadCurrentProject);
    }
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
    currentProjectInd = e.target.getAttribute("data-projectid");
    drawCurrentProject();
}

let addTodoListeners = () => {
    let allTodos = Array.from(document.querySelectorAll("[data-todoid]"));
    for(let i = 0; i < allTodos.length; i++) {
        allTodos[i].addEventListener('click', openEditTodo);
    }
}

let showAlert = (text) => {
    document.getElementById("add-content-bg").classList.remove("hidden");
    document.getElementById("alert").classList.remove("hidden");
    document.getElementById("alert").querySelector("p").textContent = text;
}

let exitAlert = () => {
    document.getElementById("alert").classList.add("hidden");
}






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
