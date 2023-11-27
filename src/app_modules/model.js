export default class Model {
  constructor() {
    this.loadProjects();
    if (this.projects.length === 0) {
      this.default = this.init();
    }
    this.activeProjectID = this.loadActiveProjectID() || 0;
  }

  loadProjects() {
    this.projects = JSON.parse(localStorage.getItem("projects")) || [];
  }

  loadActiveProjectID() {
    return JSON.parse(localStorage.getItem("activeProjectID")) || 0;
  }

  init() {
    const project = new Project(0, "Default");
    const task = new Task(0, 0, "Example Task", "01/01/2011", "Lorem", false, "no");
    project.tasks.push(task);
    this.projects.push(project);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(this.projects));
    localStorage.setItem("activeProjectID", JSON.stringify(this.activeProjectID));
    this.onProjectChanged(this.projects, this.activeProjectID);
  }

  bindProjectChanged(callback) {
    this.onProjectChanged = callback;
  }

  selectProject(id) {
    this.activeProjectID = id;
    this.saveToLocalStorage();
  }

  addProject(projectTitle) {
    const id = this.projects.length > 0 ? this.projects[this.projects.length - 1].id + 1 : 0;
    const project = new Project(id, projectTitle);
    this.projects.push(project);
    this.saveToLocalStorage();
  }

  editProject(id, text) {
    this.projects[id].title = text;
    this.saveToLocalStorage();
  }

  deleteProject(id) {
    this.projects.splice(id, 1);
    this.activeProjectID = 0;
    this.saveToLocalStorage();
  }

  selectTask(taskID) {
    this.activeTaskID = taskID;
    this.saveToLocalStorage();
  }

  addTask(projectID, title, date, description, status, priority) {
    if (projectID < 0 || projectID >= this.projects.length) {
      console.error("Invalid projectID. Task not added.");
      return;
    }

    const tasks = this.projects[projectID].tasks;
    const taskID = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0;
    const task = new Task(projectID, taskID, title, date, description, status, priority);
    tasks.push(task);
    this.saveToLocalStorage();
  }

  deleteTask(projectID, taskID) {
    this.projects[projectID].tasks.splice(taskID, 1);
    this.saveToLocalStorage();
  }

  toggleTaskPriority(projectID, taskID) {
    const task = this.projects[projectID].tasks[taskID];
    task.priority = task.priority === "no" ? "yes" : "no";
    this.saveToLocalStorage();
  }

  toggleTaskComplete(projectID, taskID) {
    const task = this.projects[projectID].tasks[taskID];
    task.status = !task.status;
    this.saveToLocalStorage();
  }

  editTask(projectID, title, date, description, priority, taskID) {
    const task = this.projects[projectID].tasks[taskID];
    task.title = title;
    task.date = date;
    task.description = description;
    task.priority = priority;
    this.saveToLocalStorage();
  }
}

class Project {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.tasks = [];
  }
}

class Task {
  constructor(projectID, id, title, date, description, status, priority) {
    this.projectID = projectID;
    this.id = id;
    this.title = title;
    this.date = date;
    this.description = description;
    this.status = status;
    this.priority = priority;
  }
}
