/** Task:
 *  1. Functionality:
 *  view all projects
 *  view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)
 *  expand a single todo to see/edit its details
 *  delete a todo
 */
import "./style.css";
import { createDefault } from "./controller";
import { insertDataToHTML } from "./ui";

document.addEventListener("DOMContentLoaded", () => {
  //get data
  createDefault();
  //create html
  insertDataToHTML();
});
