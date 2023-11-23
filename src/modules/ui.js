import createProjectLiEl from "./ui-modules/createListItemElement";
import createTaskTabEl from "./ui-modules/createTabElement";
import { ExpandWinBtnHandler } from "./ui-modules/handlers";
import Form from "./ui-modules/forms";

class UI {
  constructor() {
    this.projectListUlEl = document.querySelector("ul.list-projects");
    this.projectTaskContainer = document.querySelector(".tasks");
    this.controller;
    console.log(controller); //undefined
  }

  init() {
    this.renderProjects();
    this.renderTasks();
    this.handleDOM();
  }

  renderProjects() {
    this.projectListUlEl.innerHTML = "";
    const projects = this.controller.getProjects();
    for (let i = 0; i < projects.length; i++) {
      let project = projects[i];
      let item = createProjectLiEl(project);
      item.addEventListener("click", () => {
        this.controller.setCurrentProject(i);
        this.renderTasks();
      });
      this.projectListUlEl.appendChild(item);
    }
  }

  renderTasks() {
    this.projectTaskContainer.innerHTML = "";
    const tasks = this.controller.getTasks();
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];    
      this.controller.setCurrentTask(task);
      let controller = this.controller;
      let element = createTaskTabEl();
      this.projectTaskContainer.appendChild(element);
    }
  }

  handleDOM() {
    new ExpandWinBtnHandler(".new-project-button", ".new-projects-box");
    new ExpandWinBtnHandler(".new-task-button", ".new-task-box");
    new Form(".new-projects-window", this.controller, () =>
      this.renderProjects()
    );
    new Form(".new-tasks-window", this.controller, () => this.renderTasks());
  }
}

export default UI;
