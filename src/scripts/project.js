export class Project {

    constructor(newName, newDesc, newId) {
        this.name = newName;
        this.todos = [];
        this.id = newId;
        this.description = newDesc;
    }

    setName(title) {
        this.name = title;
    }

    setDescription(desc) {
        this.description = desc;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    getToDo(ind) {
        return this.todos[ind];
    }

    getLength() {
        return this.todos.length;
    }

    getName() {
        return this.name;
    }

    getID() {
        return this.id;
    }

    getDescription() {
        return this.description;
    }

    setTodos(list) {
        this.todos = list;
    }

    getTodos() {
        return this.todos;
    }


}