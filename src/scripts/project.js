export class Project {

    constructor(newName, newDesc, newId) {
        this.name = newName;
        this.todos = [];
        this.id = newId;
        this.description = newDesc;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    getLength() {
        return this.todos.length;
    }

    getTodo(ind) {
        return this.todos[ind];
    }

    getName() {
        return this.name;
    }

    getID() {
        return this.id;
    }

    getTodos() {
        return this.todos;
    }


}