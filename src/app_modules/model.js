export default class Model {
  constructor() {
    this.projects = [];
    this.init();
    this.selectedProject = this.projects[0]; //select first by default
    this.selectedTask = this.projects[0].tasks[0]; //select first by default
  }
  init() {
    this.addProject("Default");
    this.addProject("Default 2");

    this.addTask(
      0,
      "Example Task",
      "11/11/2011",
      "Lorem ipsum...",
      false,
      "no"
    );
  }
  addProject(projectTitle) {
    const id =
      this.projects.length > 0
        ? this.projects[this.projects.length - 1].id + 1
        : 0;
    const project = new Project(id, projectTitle);
    this.projects.push(project);
  }
  addTask(projectID, title, date, description, status, priority) {
    if (projectID < 0 || projectID >= this.projects.length) {
      console.error("Invalid projectID. Task not added.");
      return;
    }
    const tasks = this.projects[projectID].tasks;
    const taskID = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0;
    const task = new Task(
      projectID,
      taskID,
      title,
      date,
      description,
      status,
      priority
    );
    tasks.push(task);
  }
  deleteProject(projectID) {
    this.projects.splice(projectID, 1);
  }
  deleteTask(projectID, taskID) {
    this.projects[projectID].tasks.splice(taskID, 1);
  }

  selectProject(id) {
    this.selectedProject = this.projects[id];
  }
  selectTask(projectID, taskID) {
    this.selectedTask = this.projects[projectID].task[taskID];
  }
}

class Project {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.tasks = [];
  }
  editProject(title) {
    this.title = title;
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
  editTask(title, date, description) {
    this.title = title;
    this.date = date;
    this.description = description;
  }
  toggleTaskStatus() {
    this.status = !this.status;
  }
}
