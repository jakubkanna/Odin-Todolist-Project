import validateParameter from "./validators/validateParam";

export default class Controller {
  constructor(user, ui) {
    validateParameter(user, "projects");
    this.user = user;
    this.projects = user.projects;
    this.currentProject = this.projects[0]; //default
    this.tasks = this.currentProject.tasks;
    this.currentTask = this.tasks[0]; //default
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
  }
  getCurrentProject() {
    return this.currentProject;
  }
  toggleTaskStatus(task) {
    task.status = !task.status;
    this.currentTask = task;
  }
  removeTask(task) {
    this.tasks.splice(task, 1);
  }
  createProject(name) {
    this.user.createProject(name);
  }
  createTask(projectID, name, date, description, status, priority) {
    this.user.createTask(projectID, name, date, description, status, priority);
  }
}
