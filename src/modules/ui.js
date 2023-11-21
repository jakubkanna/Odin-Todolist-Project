import { WindowButtonHandler, ProjectListHandler } from "./ui-modules/buttons";
import { Form, FormHandler } from "./ui-modules/forms";

class ProjectRenderer {
  constructor(user) {
    this.user = user;
    this.list = renderProjects(this.user);
  }
}

function renderProjects(user, projectID) {
  const list = document.querySelector(".list-projects");
  list.innerHTML = "";
  for (let project of user.projects) {
    const item = createDOMElement(
      "li",
      "list-projects-item",
      list,
      project.name
    );
    let id = user.projects.indexOf(project);
    item.setAttribute("project-id", id);
  }

  return list;
}

function renderProjectTasks(user, projectID) {
  const tasks = user.projects[projectID].tasks;
  const container = document.body.querySelector(".tabs");
  container.innerHTML = ""; // Clear previous tabs
  console.log(tasks);
  tasks.forEach(() => {
    createDOMElement("div", "tab", container, createTabElement());
  });
}

function createTabElement() {
  let tab = "Heym";
  return tab;
}

function createDOMElement(tag, className, parent, innerHTML) {
  let item = document.createElement(tag);
  item.className = className;
  parent.appendChild(item);
  item.innerHTML = innerHTML;
  return item;
}

//

//settings
//set status
//set priority
//edit data
//remove project/task

function createUI(user) {
  const renderer = new ProjectRenderer(user);
  const projectListHandler = new ProjectListHandler(renderer);
  const getProjectID = () => projectListHandler.projectID;

  projectListHandler.setActive();
  renderProjectTasks(user, getProjectID()); //default (id:0)

  projectListHandler.handleSelected(renderProjectTasks);

  //handle "create new" buttons

  const projectWindowHandler = new WindowButtonHandler(
    ".new-project-button",
    ".new-projects-box"
  );
  const taskWindowHandler = new WindowButtonHandler(
    ".new-task-button",
    ".new-task-box"
  );

  // create form

  const taskForm = new Form(".new-tasks-window form");
  const projectForm = new Form(".new-projects-window form");

  //control forms

  const taskFormHandler = new FormHandler(taskForm.form);
  taskFormHandler.controlRadioButtons();
  taskFormHandler.controlFormSubmit(user, getProjectID, renderProjectTasks);

  const projectFormHandler = new FormHandler(projectForm.form);
  projectFormHandler.controlFormSubmit(user, getProjectID, renderProjects);
}

export default createUI;
