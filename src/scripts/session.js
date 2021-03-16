
import {Project} from './project.js';
import {ToDo} from './todo.js';

let session = (() => {
    let hasSession = storageAvailable("localStorage");

    function storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    function saveProjects(theProjects) {
        if(!hasSession)
            return;
        localStorage.setItem("userdata", JSON.stringify(theProjects));
        console.log("saved: " + JSON.stringify(theProjects));
    }

    function hasData() {
        if(!hasSession)
            return false;
        return localStorage.getItem("userdata") !== null;
    }

    function loadProjects() {
        if(!hasSession)
            return;
        let projects = JSON.parse(localStorage.getItem("userdata"));
        console.log(localStorage.getItem('userdata'));
        let loadedProjects =[];
        let tempTodo;
        let tempProject;
        for(let i = 0; i < projects.length; i++) {
            tempProject = new Project(projects[i].name, projects[i].description, projects[i].id);
            for(let j = 0; j < projects[i].todos.length; j++) {
                tempTodo = new ToDo(projects[i].todos[j].title, projects[i].todos[j].description, 
                    projects[i].todos[j].priority, projects[i].todos[j].dueDate, projects[i].todos[j].id);
                tempProject.addTodo(tempTodo);
            }
            loadedProjects.push(tempProject);
        }
        console.log("loaded: " + loadedProjects);
        return loadedProjects;
    }

    return {saveProjects, loadProjects, hasData}
});

export {session};