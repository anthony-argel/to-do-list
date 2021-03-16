export class ToDo {

    // not sure how sonstructors work in this
    constructor(newTitle, newDescription, newPriority, newDueDate, newId, completed) {
        this.title = newTitle;
        this.description = newDescription;
        this.priority = newPriority;
        this.dueDate = newDueDate;
        this.id = newId;
        this.isCompleted = completed;
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    getTitle() {
        return this.title;
    }

    setDescription(newDesc) {
        this.description = newDesc;
    }

    getDescription() {
        return this.description;
    }

    setId(newId) {
        this.id = newId;
    }

    getId() {
        return this.id;
    }

    getPriority() {
        return this.priority;
    }

    getDate() {
        return this.dueDate;
    }

    setCompleted(val) {
        this.isCompleted = val;
    }

    getCompleted() {
        return this.isCompleted;
    }
}