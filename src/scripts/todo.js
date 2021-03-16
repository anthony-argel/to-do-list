const todo = (() => {
    let title = "";
    let description = "";
    let priority;
    let dueDate;

    // not sure how sonstructors work in this
    let psuedoCon = (newTitle, newDescription, newPriority, newDueDate) => {
        title = newTitle;
        description = newDescription;
        priority = newPriority;
        dueDate = newDueDate;
    }

    function setTitle(newTitle) {
        title = newTitle;
    }

    function getTitle() {
        return title;
    }

    function setDescription(newDesc) {
        description = newDesc;
    }

    function getDescription() {
        return description;
    }

    return {setTitle, getTitle, setDescription, getDescription, psuedoCon}
});

export {todo};