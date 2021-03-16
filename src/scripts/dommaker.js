let domMaker = (() => {
    let createToDo = (todoName, id, completed) => {
        let todolist = document.getElementById("current-todos");
        let todo = document.createElement("div");
        todo.classList.add("todo")
        todo.dataset.todoid = id;
    
        let left = document.createElement("div");
        left.classList.add("left");
    
        let checkbox = document.createElement("div");
        checkbox.classList.add("checkbox");
    
        let name = document.createElement("p");
        name.textContent = todoName;
        if(completed) {
            todo.classList.add("completed-todo");
            checkbox.classList.add("checked");
        }
    
        left.appendChild(checkbox);
        left.appendChild(name);
    
        let right = document.createElement("div");
        right.classList.add("right");
    
        let trash = document.createElement("i");
        trash.classList.add("las");
        trash.classList.add("la-times");
        trash.classList.add("todo-erase");
        right.appendChild(trash);
    
        todo.appendChild(left);
        todo.appendChild(right);
        todolist.appendChild(todo);
    }

    let createToDos = (list) => {
        for(let i = 0; i < list.length; i++) {
            createToDo(list[i].getTitle(), list[i].getId(), list[i].getCompleted());
        }
    }
    
    function createProject(name, id) {
        let projects = document.getElementById("loadedprojects");
        let newProject = document.createElement("p");

        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("las");
        deleteIcon.classList.add("la-times");
        deleteIcon.classList.add("hover-hide");
        deleteIcon.classList.add("project-erase");
        newProject.textContent = name;
        if (id !== 0) 
          newProject.appendChild(deleteIcon);
        newProject.dataset.projectid = id;
        projects.appendChild(newProject);
    }

    return {createToDo, createProject, createToDos};
});



export {domMaker};