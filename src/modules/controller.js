import validateParameter from "./validators/validateParam";

export default class Controller {
  constructor(user, ui) {
    validateParameter(user, "projects");
    this.projects = user.projects;
    this.currentProject = this.projects[0]; //default
    this.tasks = this.currentProject.tasks;
    this.ui = ui;
  }

  init() {
    this.ui.init();
  }

  getProjects() {
    return this.projects;
  }

  getTasks() {
    return this.tasks;
  }

  setCurrentProject(id) {
    this.currentProject = this.projects[id];
    this.tasks = this.currentProject.tasks;

    console.log(this.currentProject);
  }
}
