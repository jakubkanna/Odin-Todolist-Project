export default class Model {
  constructor() {
    this.projects = JSON.parse(localStorage.getItem("projects")) || [];
    if (this.projects.length === 0) {
      this.default = this.init();
    }
    this.activeProjectID =
      JSON.parse(localStorage.getItem("activeProjectID")) || 0;
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

  _commit(projects, activeProjectID) {
    this.onProjectChanged(this.projects, this.activeProjectID);
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("activeProjectID", JSON.stringify(activeProjectID));
  }

  selectProject(id) {
    this.activeProjectID = id;
    this.onProjectChanged(this.projects, this.activeProjectID);
    this._commit(this.projects, this.activeProjectID);
  }
  addProject(projectTitle) {
    let id;
    if (this.projects.length > 0) {
      id = this.projects[this.projects.length - 1].id + 1;
    } else {
      id = 0;
    }
    const project = new Project(id, projectTitle);
    this.projects.push(project);
    this.onProjectChanged(this.projects, this.activeProjectID);
    this._commit(this.projects, this.activeProjectID);
  }
  editProject(id, text) {
    this.projects[id].title = text;
  }
  deleteProject(id) {
    // console.log(id);
    this.projects.splice(id, 1);
    this.activeProjectID = 0;
    this.onProjectChanged(this.projects, this.activeProjectID);
    this._commit(this.projects, this.activeProjectID);
  }

  selectTask(taskID) {
    this.activeTaskID = taskID;
    this.onProjectChanged(this.projects, this.activeProjectID);
    this._commit(this.projects, this.activeProjectID);
  }

  addTask(projectID, title, date, description, status, priority) {
    // console.log(projectID);
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
      this.onProjectChanged(this.projects, this.activeProjectID);
      this._commit(this.projects, this.activeProjectID);
    }
  }
  deleteTask(projectID, taskID) {
    this.projects[projectID].tasks.splice(taskID, 1);
    this.onProjectChanged(this.projects, this.activeProjectID);
    this._commit(this.projects, this.activeProjectID);
  }
  toggleTaskPriority(projectID, taskID) {
    const task = this.projects[projectID].tasks[taskID];
    if (task.priority === "no") {
      task.priority = "yes";
    } else {
      task.priority = "no";
    }

    this.onProjectChanged(this.projects, this.activeProjectID);
    this._commit(this.projects, this.activeProjectID);
  }
  toggleTaskComplete(projectID, taskID) {
    const task = this.projects[projectID].tasks[taskID];

    task.status = !task.status;

    this.onProjectChanged(this.projects, this.activeProjectID);
    this._commit(this.projects, this.activeProjectID);
  }

  editTask(projectID, taskID, title, date, description, status, priority) {
    console.log(title, date, description, status, priority);

    const task = this.projects[projectID].tasks[taskID];

    task.title = title;
    task.date = date;
    task.description = description;
    task.status = status;
    task.priority = priority;
    this.onProjectChanged(this.projects, this.activeProjectID);
    this._commit(this.projects, this.activeProjectID);
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
