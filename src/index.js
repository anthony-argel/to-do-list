import {domMaker} from './scripts/dommaker.js';
import {Project} from './scripts/project.js'
import {todo} from './scripts/todo.js'

let projects = [];
let currentProjectInd = 0;

let cancel = () => {
    let addBox = document.getElementById("add-content-bg");
    addBox.classList.add("hidden");
    let childNodes = Array.from(addBox.childNodes);
   
    if(document.getElementById("add-project")) {
        resetAddProject();
        document.getElementById("add-project").classList.add("hidden");
    }
    if (document.getElementById("add-todo")) {
        resetAddTodo();
        document.getElementById("add-todo").classList.add("hidden");
    }
    childNodes[i].classList.add("hidden");

}

let resetAddProject = () => {
    document.getElementById("proj-name").value = "";
    document.getElementById("proj-description").value = "";
}

let resetAddTodo = () => {
    console.log('erased todo')
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
        cancel();
    }
}

let openAddToDo = () => {
    let addBox = document.getElementById("add-content-bg");
    addBox.classList.remove("hidden");
    let addProj = document.getElementById("add-todo");
    addProj.classList.remove("hidden");
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
        let t1 = todo();
        t1.psuedoCon(name, description, priority, date);
        projects[currentProjectInd].addTodo(t1);
        drawProjectList();
        drawCurrentProject();
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
}

let loadCurrentProject = (e) => {
    currentProjectInd = e.target.getAttribute("data-projectid");
    drawCurrentProject();
}

let drawProjectDetails = () => {

}

let showAlert = (text) => {
    document.getElementById("add-content-bg").classList.remove("hidden");
    document.getElementById("alert").classList.remove("hidden");
    document.getElementById("alert").querySelector("p").textContent = text;
}

let exitAlert = () => {
    document.getElementById("alert").classList.add("hidden");
}





let defaultProj = new Project("default", "This is a test project", 0);
projects.push(defaultProj);
let t1 = todo();
t1.setTitle("POGGERS");
let t2 = todo();
t2.setTitle("KAPPA");
let t3 = todo();
t3.setTitle("KILL ME");
projects[currentProjectInd].addTodo(t1);
projects[currentProjectInd].addTodo(t2);
projects[currentProjectInd].addTodo(t3);


drawProjectList();
drawCurrentProject();




/*


d.createProject("Web dev", "1");
d.createProject("Game dev", "2");
d.createProject("JP studies", "3");

let d = domMaker();
d.createToDo("AHHH");
d.createToDo("Cry");
d.createToDo("Complete this to-do app project(TODAY!)");
*/


document.getElementsByClassName("la-plus")[0].addEventListener('click', openAddProject);
document.getElementsByClassName("cancel-btn")[0].addEventListener('click', cancel);
document.getElementsByClassName("cancel-btn")[1].addEventListener('click', cancel);
document.getElementsByClassName("add-btn")[0].addEventListener('click', addProject);
document.getElementsByClassName("add-btn")[1].addEventListener('click', addTodo);
document.getElementById("project-name").addEventListener('click', drawProjectDetails);
document.getElementsByClassName("la-plus-square")[0].addEventListener('click', openAddToDo);
document.getElementById("alert").querySelector("button").addEventListener('click', exitAlert);