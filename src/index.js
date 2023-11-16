/** Task:
 *  1. Functionality:
 *  view all projects
 *  view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)
 *  expand a single todo to see/edit its details
 *  delete a todo
 */
import "./style.css";
import { createDefault } from "./controller";

//if dom is ready

window.user = createDefault();
user.createProject();
user.createTask();
console.table(user.projects);

// const octicons = require("@primer/octicons");
// document.body.innerHTML += octicons.alert.toSVG(16);

//2. ui

// create header, main, footer object

// a. extend header - brandname + burger icon
// b. extend main -  sidebar + container
// c. extend footer - div
// etc.

// create insert function which will insert object into another
