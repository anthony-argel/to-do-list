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
    
    setID(num) {
        this.id = num;
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

    removeTodo(ind) {
        this.todos.splice(ind, 1);
        this.shiftTodoIdsLeft(ind);
    }

    shiftTodoIdsLeft(startInd) {
        for(let i = startInd; i < this.todos.length; i++) {
            this.todos[i].setId(this.todos[i].getId() - 1);
        }
    }

    getTodosOfDate(date) {
        let dates = [];
        for(let i = 0; i < this.todos.length; i++) {
            console.log(this.todos[i].getDate());
            if(this.todos[i].getDate() == date) {
                dates.push(this.todos[i]);
            }
        }
        return dates;
    }
}