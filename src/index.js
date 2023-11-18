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
import { icons } from "./modules/icons";

document.addEventListener("DOMContentLoaded", () => {
  const defaultUser = createUser("Default");
  createUI(defaultUser);
});
