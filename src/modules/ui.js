import { WindowButtonHandler, ProjectListHandler } from "./ui-modules/buttons";
import { Form, FormHandler } from "./ui-modules/forms";
import createTab from "./ui-modules/tab";

class ProjectRenderer {
  constructor(user) {
    this.user = user;
    this.list = this.renderProjects(this.user);
  }
  renderProjects(user) {
    const list = document.querySelector(".list-projects");
    list.innerHTML = "";
    for (let project of user.projects) {
      let id = user.projects.indexOf(project);
      createLIElement(project, list, id);
    }
    return list;
  }
}
function createLIElement(project, parent, id) {
  const item = document.createElement("li");
  item.classList.add("list-projects-item");
  parent.appendChild(item);
  item.innerText = project.name;
  item.setAttribute("project-id", id);
}

function renderProjectTasks(user, projectID) {
  const tasks = user.projects[projectID].tasks;
  const container = document.body.querySelector(".tasks");
  container.innerHTML = ""; // Clear previous tabs
  tasks.forEach((task, index) => {
    let tab = createTab(task, index);
    container.appendChild(tab);
    tab.setAttribute("project-id", `${projectID}`);
  });
}

function createUI(user) {
  const renderer = new ProjectRenderer(user);
  const projectListHandler = new ProjectListHandler(renderer);

  const getProjectID = () => projectListHandler.projectID;

  projectListHandler.setActive();

  renderProjectTasks(user, getProjectID()); //default (id:0)

  projectListHandler.handleSelected(renderProjectTasks);

  //handle "create new" buttons

  new WindowButtonHandler(".new-project-button", ".new-projects-box");
  new WindowButtonHandler(".new-task-button", ".new-task-box");

  // create form

  const taskForm = new Form(".new-tasks-window form");
  const projectForm = new Form(".new-projects-window form");

  //control forms

  const taskFormHandler = new FormHandler(taskForm.form);
  taskFormHandler.controlRadioButtons();
  taskFormHandler.controlFormSubmit(user, getProjectID, renderProjectTasks);

  const projectFormHandler = new FormHandler(projectForm.form);
  projectFormHandler.controlFormSubmit(
    user,
    getProjectID,
    renderer.renderProjects
  );
}

export default createUI;
//
// const date = new Element("p", "task-deadline");
// if (task.date) {
//   date.element.innerHTML = task.date;
// }
// //
// const settings = new Element("div", "task-settings");
// const check = new Element("button", "bi bi-check-lg");
// settings.element.appendChild(check.element);
// const edit = new Element("button", "bi bi-pencil");
// settings.element.appendChild(edit.element);
// const close = new Element("button", "bi bi-x-lg");
// settings.element.appendChild(close.element);
// //
// const note = new Element("div", "task-note");
// if (task.description) {
//   note.element.innerHTML = task.description;
// }
// return [title.element, date.element, settings.element, note.element];
