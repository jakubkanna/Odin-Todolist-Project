/** Task:
 *  1. Functionality:
 *  view all projects
 *  view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)
 *  expand a single todo to see/edit its details
 *  delete a todo
 */
import "./style.css";
import createUI from "./modules/ui";
import { createUser } from "./modules/user";
import "bootstrap-icons/font/bootstrap-icons.css";

document.addEventListener("DOMContentLoaded", () => {
  window.defaultUser = createUser("Default");
  createUI(defaultUser);
  //store data
});
