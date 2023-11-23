import createProjectLiEl from "./ui-modules/createListItemElement";
import createTaskTabEl from "./ui-modules/createTabElement";

class UI {
  constructor() {
    this.projectListUlEl = document.querySelector("ul.list-projects");
    this.projectTaskContainer = document.querySelector(".tasks");
    this.controller;
  }

  init() {
    this.renderProjects();
    this.renderTasks();
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
      let element = createTaskTabEl(task);
      this.projectTaskContainer.appendChild(element);
    }
  }
}

export default UI;
