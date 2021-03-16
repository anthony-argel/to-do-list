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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_dommaker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/dommaker.js */ \"./src/scripts/dommaker.js\");\n/* harmony import */ var _scripts_project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/project.js */ \"./src/scripts/project.js\");\n/* harmony import */ var _scripts_todo_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/todo.js */ \"./src/scripts/todo.js\");\n\n\n\n\nlet projects = [];\nlet currentProjectInd = 0;\n\nlet cancel = () => {\n    let addBox = document.getElementById(\"add-content-bg\");\n    addBox.classList.add(\"hidden\");\n    let childNodes = Array.from(addBox.childNodes);\n   \n    if(document.getElementById(\"add-project\")) {\n        resetAddProject();\n        document.getElementById(\"add-project\").classList.add(\"hidden\");\n    }\n    if (document.getElementById(\"add-todo\")) {\n        resetAddTodo();\n        document.getElementById(\"add-todo\").classList.add(\"hidden\");\n    }\n    childNodes[i].classList.add(\"hidden\");\n\n}\n\nlet resetAddProject = () => {\n    document.getElementById(\"proj-name\").value = \"\";\n    document.getElementById(\"proj-description\").value = \"\";\n}\n\nlet resetAddTodo = () => {\n    console.log('erased todo')\n    document.getElementById(\"todo-name\").value = \"\";\n    document.getElementById(\"todo-description\").value = \"\";\n    document.getElementById('todo-date').value = \"\";\n    document.getElementById('todo-prio').value = \"1\";\n}\n\n\nlet openAddProject = () => {\n    let addBox = document.getElementById(\"add-content-bg\");\n    addBox.classList.remove(\"hidden\");\n    let addProj = document.getElementById(\"add-project\");\n    addProj.classList.remove(\"hidden\");\n}\n\nlet addProject = () => {\n    let name = document.getElementById(\"proj-name\").value.trim();\n    let description = document.getElementById(\"proj-description\").value.trim();\n    if(name === \"\") {\n        showAlert(\"Please enter a project name.\");\n    }\n    else {\n        let p1 = new _scripts_project_js__WEBPACK_IMPORTED_MODULE_1__.Project(name, description, projects.length);\n        projects.push(p1);\n        drawProjectList();\n        cancel();\n    }\n}\n\nlet openAddToDo = () => {\n    let addBox = document.getElementById(\"add-content-bg\");\n    addBox.classList.remove(\"hidden\");\n    let addProj = document.getElementById(\"add-todo\");\n    addProj.classList.remove(\"hidden\");\n}\n\nlet addTodo = () => {\n    let name = document.getElementById(\"todo-name\").value.trim();\n    let description = document.getElementById(\"todo-description\").value.trim();\n    let date = document.getElementById('todo-date').value;\n    let priority = document.getElementById('todo-prio').value;\n    let errorMsg = \"Please enter \";\n    let errorCount = 0;\n    if(name === \"\") {\n        errorMsg += \"a name\"\n        errorCount++;\n    }\n    if(date == \"\") {\n        if(errorCount == 1)\n            errorMsg += \" and\";\n        errorMsg += \" a date\";\n        errorCount++;\n    }\n    errorMsg += \".\";\n    \n    if(errorCount == 0) {\n        let t1 = (0,_scripts_todo_js__WEBPACK_IMPORTED_MODULE_2__.todo)();\n        t1.psuedoCon(name, description, priority, date);\n        projects[currentProjectInd].addTodo(t1);\n        drawProjectList();\n        drawCurrentProject();\n        cancel();\n    }\n    else {\n        showAlert(errorMsg);\n    }\n}\n\nlet drawProjectList = () => {\n    emptyChildNodesById(\"loadedprojects\");\n\n    let d = (0,_scripts_dommaker_js__WEBPACK_IMPORTED_MODULE_0__.domMaker)();\n    for(let i = 0; i < projects.length; i++) {\n        d.createProject(projects[i].getName(), projects[i].getID());\n    }\n\n    // shouldn't be both drawing and creating on click events\n    let newProjects = Array.from(document.querySelectorAll(\"[data-projectid]\"));\n    for(let i = 0; i < newProjects.length; i++) {\n        newProjects[i].addEventListener('click', loadCurrentProject);\n    }\n}\n\nlet emptyChildNodesById = (parentId) => {\n    let loadedProjects = document.getElementById(parentId);\n    while(loadedProjects.hasChildNodes()) {\n        loadedProjects.removeChild(loadedProjects.firstChild);\n    }\n}\n\nlet drawCurrentProject = () => {\n    emptyChildNodesById(\"current-todos\");\n    document.getElementById(\"project-name\").textContent = projects[currentProjectInd].getName();\n    let d = (0,_scripts_dommaker_js__WEBPACK_IMPORTED_MODULE_0__.domMaker)();\n    d.createToDos(projects[currentProjectInd].getTodos());\n}\n\nlet loadCurrentProject = (e) => {\n    currentProjectInd = e.target.getAttribute(\"data-projectid\");\n    drawCurrentProject();\n}\n\nlet drawProjectDetails = () => {\n\n}\n\nlet showAlert = (text) => {\n    document.getElementById(\"add-content-bg\").classList.remove(\"hidden\");\n    document.getElementById(\"alert\").classList.remove(\"hidden\");\n    document.getElementById(\"alert\").querySelector(\"p\").textContent = text;\n}\n\nlet exitAlert = () => {\n    document.getElementById(\"alert\").classList.add(\"hidden\");\n}\n\n\n\n\n\nlet defaultProj = new _scripts_project_js__WEBPACK_IMPORTED_MODULE_1__.Project(\"default\", \"This is a test project\", 0);\nprojects.push(defaultProj);\nlet t1 = (0,_scripts_todo_js__WEBPACK_IMPORTED_MODULE_2__.todo)();\nt1.setTitle(\"POGGERS\");\nlet t2 = (0,_scripts_todo_js__WEBPACK_IMPORTED_MODULE_2__.todo)();\nt2.setTitle(\"KAPPA\");\nlet t3 = (0,_scripts_todo_js__WEBPACK_IMPORTED_MODULE_2__.todo)();\nt3.setTitle(\"KILL ME\");\nprojects[currentProjectInd].addTodo(t1);\nprojects[currentProjectInd].addTodo(t2);\nprojects[currentProjectInd].addTodo(t3);\n\n\ndrawProjectList();\ndrawCurrentProject();\n\n\n\n\n/*\n\n\nd.createProject(\"Web dev\", \"1\");\nd.createProject(\"Game dev\", \"2\");\nd.createProject(\"JP studies\", \"3\");\n\nlet d = domMaker();\nd.createToDo(\"AHHH\");\nd.createToDo(\"Cry\");\nd.createToDo(\"Complete this to-do app project(TODAY!)\");\n*/\n\n\ndocument.getElementsByClassName(\"la-plus\")[0].addEventListener('click', openAddProject);\ndocument.getElementsByClassName(\"cancel-btn\")[0].addEventListener('click', cancel);\ndocument.getElementsByClassName(\"cancel-btn\")[1].addEventListener('click', cancel);\ndocument.getElementsByClassName(\"add-btn\")[0].addEventListener('click', addProject);\ndocument.getElementsByClassName(\"add-btn\")[1].addEventListener('click', addTodo);\ndocument.getElementById(\"project-name\").addEventListener('click', drawProjectDetails);\ndocument.getElementsByClassName(\"la-plus-square\")[0].addEventListener('click', openAddToDo);\ndocument.getElementById(\"alert\").querySelector(\"button\").addEventListener('click', exitAlert);\n\n//# sourceURL=webpack://todoapp/./src/index.js?");

/***/ }),

/***/ "./src/scripts/dommaker.js":
/*!*********************************!*\
  !*** ./src/scripts/dommaker.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"domMaker\": () => (/* binding */ domMaker)\n/* harmony export */ });\nlet domMaker = (() => {\n    let createToDo = (todoName) => {\n        let todolist = document.getElementById(\"current-todos\");\n        let todo = document.createElement(\"div\");\n        todo.classList.add(\"todo\")\n    \n        let left = document.createElement(\"div\");\n        left.classList.add(\"left\");\n    \n        let checkbox = document.createElement(\"div\");\n        checkbox.classList.add(\"checkbox\");\n    \n        let name = document.createElement(\"p\");\n        name.textContent = todoName;\n    \n        left.appendChild(checkbox);\n        left.appendChild(name);\n    \n        let right = document.createElement(\"div\");\n        right.classList.add(\"right\");\n    \n        let trash = document.createElement(\"i\");\n        trash.classList.add(\"las\");\n        trash.classList.add(\"la-trash\");\n    \n        let edit = document.createElement(\"i\");\n        edit.classList.add(\"las\");\n        edit.classList.add(\"la-pen\");\n    \n        right.appendChild(trash);\n        right.appendChild(edit);\n    \n        todo.appendChild(left);\n        todo.appendChild(right);\n        todolist.appendChild(todo);\n    }\n\n    let createToDos = (list) => {\n        for(let i = 0; i < list.length; i++) {\n            createToDo(list[i].getTitle());\n        }\n    }\n    \n    function createProject(name, id) {\n        let projects = document.getElementById(\"loadedprojects\");\n        let newProject = document.createElement(\"p\");\n        newProject.textContent = name;\n        newProject.dataset.projectid = id;\n        projects.appendChild(newProject);\n    }\n\n    return {createToDo, createProject, createToDos};\n});\n\n\n\n\n\n//# sourceURL=webpack://todoapp/./src/scripts/dommaker.js?");

/***/ }),

/***/ "./src/scripts/project.js":
/*!********************************!*\
  !*** ./src/scripts/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Project\": () => (/* binding */ Project)\n/* harmony export */ });\nclass Project {\n\n    constructor(newName, newDesc, newId) {\n        this.name = newName;\n        this.todos = [];\n        this.id = newId;\n        this.description = newDesc;\n    }\n\n    addTodo(todo) {\n        this.todos.push(todo);\n    }\n\n    getLength() {\n        return this.todos.length;\n    }\n\n    getTodo(ind) {\n        return this.todos[ind];\n    }\n\n    getName() {\n        return this.name;\n    }\n\n    getID() {\n        return this.id;\n    }\n\n    getTodos() {\n        return this.todos;\n    }\n\n\n}\n\n//# sourceURL=webpack://todoapp/./src/scripts/project.js?");

/***/ }),

/***/ "./src/scripts/todo.js":
/*!*****************************!*\
  !*** ./src/scripts/todo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"todo\": () => (/* binding */ todo)\n/* harmony export */ });\nconst todo = (() => {\n    let title = \"\";\n    let description = \"\";\n    let priority;\n    let dueDate;\n\n    // not sure how sonstructors work in this\n    let psuedoCon = (newTitle, newDescription, newPriority, newDueDate) => {\n        title = newTitle;\n        description = newDescription;\n        priority = newPriority;\n        dueDate = newDueDate;\n    }\n\n    function setTitle(newTitle) {\n        title = newTitle;\n    }\n\n    function getTitle() {\n        return title;\n    }\n\n    function setDescription(newDesc) {\n        description = newDesc;\n    }\n\n    function getDescription() {\n        return description;\n    }\n\n    return {setTitle, getTitle, setDescription, getDescription, psuedoCon}\n});\n\n\n\n//# sourceURL=webpack://todoapp/./src/scripts/todo.js?");

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