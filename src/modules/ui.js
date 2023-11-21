import { WindowButtonHandler, ProjectListHandler } from "./ui-modules/buttons";
import { Form, FormHandler } from "./ui-modules/forms";
import Element from "./ui-modules/element"; //class for quick making DOM el

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
    const item = new Element("li", "list-projects-item", list);
    item.element.innerText = project.name;
    let id = user.projects.indexOf(project);
    item.element.setAttribute("project-id", id);
  }
  return list;
}

function renderProjectTasks(user, projectID) {
  const tasks = user.projects[projectID].tasks;
  const container = document.body.querySelector(".tabs");
  container.innerHTML = ""; // Clear previous tabs
  console.log(tasks);
  tasks.forEach((task) => {
    let tab = new Element(
      "div",
      `tab-${projectID}`,
      container,
      createTabElement(task)
    );
    controlTabSettings(task, tab.element);
  });
}

function createTabElement(task) {
  const title = new Element("h2", "task-name");
  title.element.innerHTML = task.name;

  const date = new Element("p", "task-deadline");
  date.element.innerHTML = task.date;

  const settings = new Element("div", "task-settings");
  settings.element.innerHTML = "settings";

  const note = new Element("div", "task-note");
  note.element.innerHTML = task.description;

  return [title.element, date.element, settings.element, note.element];
}

function controlTabSettings(task, tab) {
  if (task.status === "yes") {
    tab.classList.add("important");
  }
}

function handleTabSettings() {}
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
