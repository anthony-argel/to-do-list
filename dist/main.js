/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_dommaker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/dommaker.js */ \"./src/scripts/dommaker.js\");\n/* harmony import */ var _scripts_project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/project.js */ \"./src/scripts/project.js\");\n/* harmony import */ var _scripts_todo_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/todo.js */ \"./src/scripts/todo.js\");\n/* harmony import */ var _scripts_session_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/session.js */ \"./src/scripts/session.js\");\n\n\n\n\n\nlet currentSession = (0,_scripts_session_js__WEBPACK_IMPORTED_MODULE_3__.session)();\nlet projects = [];\nlet currentProjectInd = 0;\nlet currentTodoInd = 0;\n\nlet startup = () => {\n    if(projects.length == 0 && currentSession.hasData()) {\n        console.log(\"loading data\");\n        projects = currentSession.loadProjects();\n    }\n    else {\n        console.log(\"loading default setup\");\n        let defaultProj = new _scripts_project_js__WEBPACK_IMPORTED_MODULE_1__.Project(\"default\", \"This is a test project\", 0);\n        projects.push(defaultProj);\n    }\n}\n\n\nlet cancel = () => {\n    let addBox = document.getElementById(\"add-content-bg\");\n    addBox.classList.add(\"hidden\");\n   \n    if(!document.getElementById(\"add-project\").classList.contains(\"hidden\")) {\n        resetAddProject();\n        document.getElementById(\"add-project\").classList.add(\"hidden\");\n    }\n    if (!document.getElementById(\"add-todo\").classList.contains(\"hidden\")) {\n        resetAddTodo();\n        document.getElementById(\"add-todo\").classList.add(\"hidden\");\n    }\n}\n\nlet resetAddProject = () => {\n    document.getElementById(\"proj-name\").value = \"\";\n    document.getElementById(\"proj-description\").value = \"\";\n}\n\nlet resetAddTodo = () => {\n    document.getElementById(\"todo-name\").value = \"\";\n    document.getElementById(\"todo-description\").value = \"\";\n    document.getElementById('todo-date').value = \"\";\n    document.getElementById('todo-prio').value = \"1\";\n}\n\n\nlet openAddProject = () => {\n    let addBox = document.getElementById(\"add-content-bg\");\n    addBox.classList.remove(\"hidden\");\n    let addProj = document.getElementById(\"add-project\");\n    addProj.classList.remove(\"hidden\");\n    document.getElementById(\"add-project\").querySelectorAll(\"button\")[1].classList.add(\"hidden\");\n    document.getElementById(\"add-project\").querySelectorAll(\"button\")[0].classList.remove(\"hidden\");\n    document.getElementById(\"add-project\").querySelector(\"p\").textContent = \"Create New Project\";\n}\n\nlet openEditProject = () => {\n    let addBox = document.getElementById(\"add-content-bg\");\n    addBox.classList.remove(\"hidden\");\n    let addProj = document.getElementById(\"add-project\");\n    addProj.classList.remove(\"hidden\");\n    document.getElementById(\"add-project\").querySelectorAll(\"button\")[1].classList.remove(\"hidden\");\n    document.getElementById(\"add-project\").querySelectorAll(\"button\")[0].classList.add(\"hidden\");\n    document.getElementById(\"add-project\").querySelector(\"p\").textContent = \"Edit Project\";\n\n    document.getElementById(\"proj-name\").value = projects[currentProjectInd].getName();\n    document.getElementById(\"proj-description\").value = projects[currentProjectInd].getDescription();\n}\n\nlet addProject = () => {\n    let name = document.getElementById(\"proj-name\").value.trim();\n    let description = document.getElementById(\"proj-description\").value.trim();\n    if(name === \"\") {\n        showAlert(\"Please enter a project name.\");\n    }\n    else {\n        let p1 = new _scripts_project_js__WEBPACK_IMPORTED_MODULE_1__.Project(name, description, projects.length);\n        projects.push(p1);\n        drawProjectList();\n        currentSession.saveProjects(projects);\n        cancel();\n    }\n}\n\nlet saveProjectEdit = () => {\n    let name = document.getElementById(\"proj-name\").value.trim();\n    let description = document.getElementById(\"proj-description\").value.trim();\n    if(name === \"\") {\n        showAlert(\"Please enter a project name.\");\n    }\n    else {\n        projects[currentProjectInd].setName(name);\n        projects[currentProjectInd].setDescription(description);\n        drawProjectList();\n        drawCurrentProject();\n        currentSession.saveProjects(projects);\n        cancel();\n    }\n}\n\nlet openAddToDo = () => {\n    let addBox = document.getElementById(\"add-content-bg\");\n    addBox.classList.remove(\"hidden\");\n    let addProj = document.getElementById(\"add-todo\");\n    addProj.classList.remove(\"hidden\");\n    document.getElementById(\"add-todo\").querySelectorAll(\"button\")[1].classList.add(\"hidden\");\n    document.getElementById(\"add-todo\").querySelectorAll(\"button\")[0].classList.remove(\"hidden\");\n}\n\nlet openEditTodo = (e) => {\n    currentTodoInd = e.currentTarget.getAttribute(\"data-todoid\");\n    let addBox = document.getElementById(\"add-content-bg\");\n    addBox.classList.remove(\"hidden\");\n    let addProj = document.getElementById(\"add-todo\");\n    addProj.classList.remove(\"hidden\");\n\n    document.getElementById(\"todo-name\").value = projects[currentProjectInd].getToDo(currentTodoInd).getTitle();\n    document.getElementById(\"todo-description\").value = projects[currentProjectInd].getToDo(currentTodoInd).getDescription();\n    document.getElementById(\"todo-prio\").value = +projects[currentProjectInd].getToDo(currentTodoInd).getPriority();\n    document.getElementById(\"todo-date\").value = projects[currentProjectInd].getToDo(currentTodoInd).getDate();\n\n    document.getElementById(\"add-todo\").querySelectorAll(\"button\")[1].classList.remove(\"hidden\");\n    document.getElementById(\"add-todo\").querySelectorAll(\"button\")[0].classList.add(\"hidden\");\n    document.getElementById(\"add-todo\").querySelector(\"p\").textContent = \"Edit To-do\";\n}\n\nlet addTodo = () => {\n    let name = document.getElementById(\"todo-name\").value.trim();\n    let description = document.getElementById(\"todo-description\").value.trim();\n    let date = document.getElementById('todo-date').value;\n    let priority = document.getElementById('todo-prio').value;\n    let errorMsg = \"Please enter \";\n    let errorCount = 0;\n    if(name === \"\") {\n        errorMsg += \"a name\"\n        errorCount++;\n    }\n    if(date == \"\") {\n        if(errorCount == 1)\n            errorMsg += \" and\";\n        errorMsg += \" a date\";\n        errorCount++;\n    }\n    errorMsg += \".\";\n    \n    if(errorCount == 0) {\n        let t1 = new _scripts_todo_js__WEBPACK_IMPORTED_MODULE_2__.ToDo(name, description, priority, date, projects[currentProjectInd].getLength());\n        projects[currentProjectInd].addTodo(t1);\n        drawProjectList();\n        drawCurrentProject();\n        currentSession.saveProjects(projects);      \n        cancel();\n    }\n    else {\n        showAlert(errorMsg);\n    }\n}\n\nlet drawProjectList = () => {\n    emptyChildNodesById(\"loadedprojects\");\n\n    let d = (0,_scripts_dommaker_js__WEBPACK_IMPORTED_MODULE_0__.domMaker)();\n    for(let i = 0; i < projects.length; i++) {\n        d.createProject(projects[i].getName(), projects[i].getID());\n    }\n\n    // shouldn't be both drawing and creating on click events\n    let newProjects = Array.from(document.querySelectorAll(\"[data-projectid]\"));\n    for(let i = 0; i < newProjects.length; i++) {\n        newProjects[i].addEventListener('click', loadCurrentProject);\n    }\n}\n\nlet emptyChildNodesById = (parentId) => {\n    let loadedProjects = document.getElementById(parentId);\n    while(loadedProjects.hasChildNodes()) {\n        loadedProjects.removeChild(loadedProjects.firstChild);\n    }\n}\n\nlet drawCurrentProject = () => {\n    emptyChildNodesById(\"current-todos\");\n    document.getElementById(\"project-name\").textContent = projects[currentProjectInd].getName();\n    let d = (0,_scripts_dommaker_js__WEBPACK_IMPORTED_MODULE_0__.domMaker)();\n    d.createToDos(projects[currentProjectInd].getTodos());\n    addTodoListeners();\n}\n\nlet loadCurrentProject = (e) => {\n    currentProjectInd = e.target.getAttribute(\"data-projectid\");\n    drawCurrentProject();\n}\n\nlet addTodoListeners = () => {\n    let allTodos = Array.from(document.querySelectorAll(\"[data-todoid]\"));\n    for(let i = 0; i < allTodos.length; i++) {\n        allTodos[i].addEventListener('click', openEditTodo);\n    }\n}\n\nlet showAlert = (text) => {\n    document.getElementById(\"add-content-bg\").classList.remove(\"hidden\");\n    document.getElementById(\"alert\").classList.remove(\"hidden\");\n    document.getElementById(\"alert\").querySelector(\"p\").textContent = text;\n}\n\nlet exitAlert = () => {\n    document.getElementById(\"alert\").classList.add(\"hidden\");\n}\n\n\n\n\n\n\nstartup();\ndrawProjectList();\ndrawCurrentProject();\n\ndocument.getElementsByClassName(\"la-plus\")[0].addEventListener('click', openAddProject);\ndocument.getElementsByClassName(\"cancel-btn\")[0].addEventListener('click', cancel);\ndocument.getElementsByClassName(\"cancel-btn\")[1].addEventListener('click', cancel);\ndocument.getElementsByClassName(\"add-btn\")[0].addEventListener('click', addProject);\ndocument.getElementsByClassName(\"add-btn\")[1].addEventListener('click', addTodo);\ndocument.getElementsByClassName(\"edit-btn\")[0].addEventListener('click', saveProjectEdit);\ndocument.getElementsByClassName(\"la-plus-square\")[0].addEventListener('click', openAddToDo);\ndocument.getElementById(\"alert\").querySelector(\"button\").addEventListener('click', exitAlert);\ndocument.getElementById(\"project-name\").addEventListener('click', openEditProject);\n\n\n//# sourceURL=webpack://todoapp/./src/index.js?");

/***/ }),

/***/ "./src/scripts/dommaker.js":
/*!*********************************!*\
  !*** ./src/scripts/dommaker.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"domMaker\": () => (/* binding */ domMaker)\n/* harmony export */ });\nlet domMaker = (() => {\n    let createToDo = (todoName, id) => {\n        let todolist = document.getElementById(\"current-todos\");\n        let todo = document.createElement(\"div\");\n        todo.classList.add(\"todo\")\n        todo.dataset.todoid = id;\n    \n        let left = document.createElement(\"div\");\n        left.classList.add(\"left\");\n    \n        let checkbox = document.createElement(\"div\");\n        checkbox.classList.add(\"checkbox\");\n    \n        let name = document.createElement(\"p\");\n        name.textContent = todoName;\n    \n        left.appendChild(checkbox);\n        left.appendChild(name);\n    \n        let right = document.createElement(\"div\");\n        right.classList.add(\"right\");\n    \n        let trash = document.createElement(\"i\");\n        trash.classList.add(\"las\");\n        trash.classList.add(\"la-times\");\n    \n        right.appendChild(trash);\n    \n        todo.appendChild(left);\n        todo.appendChild(right);\n        todolist.appendChild(todo);\n    }\n\n    let createToDos = (list) => {\n        for(let i = 0; i < list.length; i++) {\n            createToDo(list[i].getTitle(), list[i].getId());\n        }\n    }\n    \n    function createProject(name, id) {\n        let projects = document.getElementById(\"loadedprojects\");\n        let newProject = document.createElement(\"p\");\n        newProject.textContent = name;\n        newProject.dataset.projectid = id;\n        projects.appendChild(newProject);\n    }\n\n    return {createToDo, createProject, createToDos};\n});\n\n\n\n\n\n//# sourceURL=webpack://todoapp/./src/scripts/dommaker.js?");

/***/ }),

/***/ "./src/scripts/project.js":
/*!********************************!*\
  !*** ./src/scripts/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Project\": () => (/* binding */ Project)\n/* harmony export */ });\nclass Project {\n\n    constructor(newName, newDesc, newId) {\n        this.name = newName;\n        this.todos = [];\n        this.id = newId;\n        this.description = newDesc;\n    }\n\n    setName(title) {\n        this.name = title;\n    }\n\n    setDescription(desc) {\n        this.description = desc;\n    }\n\n    addTodo(todo) {\n        this.todos.push(todo);\n    }\n\n    getToDo(ind) {\n        return this.todos[ind];\n    }\n\n    getLength() {\n        return this.todos.length;\n    }\n\n    getName() {\n        return this.name;\n    }\n\n    getID() {\n        return this.id;\n    }\n\n    getDescription() {\n        return this.description;\n    }\n\n    setTodos(list) {\n        this.todos = list;\n    }\n\n    getTodos() {\n        return this.todos;\n    }\n\n\n}\n\n//# sourceURL=webpack://todoapp/./src/scripts/project.js?");

/***/ }),

/***/ "./src/scripts/session.js":
/*!********************************!*\
  !*** ./src/scripts/session.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"session\": () => (/* binding */ session)\n/* harmony export */ });\n/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ \"./src/scripts/project.js\");\n/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo.js */ \"./src/scripts/todo.js\");\n\n\n\n\nlet session = (() => {\n    let hasSession = storageAvailable(\"localStorage\");\n\n    function storageAvailable(type) {\n        var storage;\n        try {\n            storage = window[type];\n            var x = '__storage_test__';\n            storage.setItem(x, x);\n            storage.removeItem(x);\n            return true;\n        }\n        catch(e) {\n            return e instanceof DOMException && (\n                // everything except Firefox\n                e.code === 22 ||\n                // Firefox\n                e.code === 1014 ||\n                // test name field too, because code might not be present\n                // everything except Firefox\n                e.name === 'QuotaExceededError' ||\n                // Firefox\n                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&\n                // acknowledge QuotaExceededError only if there's something already stored\n                (storage && storage.length !== 0);\n        }\n    }\n\n    function saveProjects(theProjects) {\n        if(!hasSession)\n            return;\n        localStorage.setItem(\"userdata\", JSON.stringify(theProjects));\n        console.log(\"saved: \" + JSON.stringify(theProjects));\n    }\n\n    function hasData() {\n        if(!hasSession)\n            return false;\n        return localStorage.getItem(\"userdata\") !== null;\n    }\n\n    function loadProjects() {\n        if(!hasSession)\n            return;\n        let projects = JSON.parse(localStorage.getItem(\"userdata\"));\n        console.log(localStorage.getItem('userdata'));\n        let loadedProjects =[];\n        let tempTodo;\n        let tempProject;\n        for(let i = 0; i < projects.length; i++) {\n            tempProject = new _project_js__WEBPACK_IMPORTED_MODULE_0__.Project(projects[i].name, projects[i].description, projects[i].id);\n            for(let j = 0; j < projects[i].todos.length; j++) {\n                tempTodo = new _todo_js__WEBPACK_IMPORTED_MODULE_1__.ToDo(projects[i].todos[j].title, projects[i].todos[j].description, \n                    projects[i].todos[j].priority, projects[i].todos[j].dueDate, projects[i].todos[j].id);\n                tempProject.addTodo(tempTodo);\n            }\n            loadedProjects.push(tempProject);\n        }\n        console.log(\"loaded: \" + loadedProjects);\n        return loadedProjects;\n    }\n\n    return {saveProjects, loadProjects, hasData}\n});\n\n\n\n//# sourceURL=webpack://todoapp/./src/scripts/session.js?");

/***/ }),

/***/ "./src/scripts/todo.js":
/*!*****************************!*\
  !*** ./src/scripts/todo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ToDo\": () => (/* binding */ ToDo)\n/* harmony export */ });\nclass ToDo {\n\n    // not sure how sonstructors work in this\n    constructor(newTitle, newDescription, newPriority, newDueDate, newId) {\n        this.title = newTitle;\n        this.description = newDescription;\n        this.priority = newPriority;\n        this.dueDate = newDueDate;\n        this.id = newId;\n    }\n\n    setTitle(newTitle) {\n        this.title = newTitle;\n    }\n\n    getTitle() {\n        return this.title;\n    }\n\n    setDescription(newDesc) {\n        this.description = newDesc;\n    }\n\n    getDescription() {\n        return this.description;\n    }\n\n    setId(newId) {\n        this.id = newId;\n    }\n\n    getId() {\n        return this.id;\n    }\n\n    getPriority() {\n        return this.priority;\n    }\n\n    getDate() {\n        return this.dueDate;\n    }\n}\n\n//# sourceURL=webpack://todoapp/./src/scripts/todo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;