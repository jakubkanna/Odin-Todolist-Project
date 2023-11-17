/** Task:
 *  1. Functionality:
 *  view all projects
 *  view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)
 *  expand a single todo to see/edit its details
 *  delete a todo
 */
import "./style.css";
import { createDefault } from "./controller";
import { createDOMSkeleton } from "./ui";

document.addEventListener("DOMContentLoaded", () => {
  let user = createDefault();
  //   console.table(user.projects);
  //
  createDOMSkeleton();
});

//insert data

// const octicons = require("@primer/octicons");
// document.body.innerHTML += octicons.alert.toSVG(16);
