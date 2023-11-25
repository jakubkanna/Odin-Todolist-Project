export default class Model {
  constructor() {
    this.projects = JSON.parse(localStorage.getItem("projects")) || [];
    if (this.projects.length === 0) {
      this.default = this.init();
    }
    this.selectedProject =
      JSON.parse(localStorage.getItem("selectedProject")) || this.projects[0]; //select first by default
    this.selectedTask = this.projects[0].tasks[0]; //select first by default
  }
  init() {
    //default project
    const project = new Project(0, "Default");
    //default task
    const task = new Task(
      0,
      0,
      "Example Task",
      "01/01/2011",
      "Lorem",
      false,
      "no"
    );
    project.tasks.push(task);
    this.projects.push(project);
  }

  bindProjectChanged(callback) {
    this.onProjectChanged = callback;
  }
  _commit(projects, selectedProject) {
    this.onProjectChanged(this.projects, this.selectedProject);
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("selectedProject", JSON.stringify(selectedProject));
  }

  addProject(projectTitle) {
    const id =
      this.projects.length > 0
        ? this.projects[this.projects.length - 1].id + 1
        : 0;
    const project = new Project(id, projectTitle);
    this.projects.push(project);
    this.onProjectChanged(this.projects, this.selectedProject);
    this._commit(this.projects, this.selectedProject);
  }

  addTask(projectID, title, date, description, status, priority) {
    if (projectID < 0 || projectID >= this.projects.length) {
      console.error("Invalid projectID. Task not added.");
      return;
    } else {
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
      this.selectedTask = task;
      this.onProjectChanged(this.projects, this.selectedProject);
      this._commit(this.projects, this.selectedProject);
    }
  }

  deleteProject(projectID) {
    this.projects.splice(projectID, 1);
    this.onProjectChanged(this.projects, this.selectedProject);
    this._commit(this.projects, this.selectedProject);
  }
  deleteTask(projectID, taskID) {
    this.projects[projectID].tasks.splice(taskID, 1);
    this.onProjectChanged(this.projects, this.selectedProject);
    this._commit(this.projects, this.selectedProject);
  }

  selectProject(id) {
    this.selectedProject = this.projects[id];
    this.onProjectChanged(this.projects, this.selectedProject);
    this._commit(this.projects, this.selectedProject);
  }
  selectTask(projectID, taskID) {
    this.selectedTask = this.projects[projectID].task[taskID];
    this.onProjectChanged(this.projects, this.selectedProject);
    this._commit(this.projects, this.selectedProject);
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
  editTask(title, date, description, priority) {
    this.title = title;
    this.date = date;
    this.description = description;
    this.priority = priority;
  }
  toggleTaskComplete() {
    this.status = !this.status;
  }
  toggleTaskPriority() {
    if (this.priority === "no") {
      this.priority = "yes";
    } else {
      this.priority = "no";
    }
  }
}
