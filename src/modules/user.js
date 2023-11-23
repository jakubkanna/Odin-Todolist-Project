class Project {
  static projectIdCounter = 0;

  constructor(name) {
    this.id = Project.projectIdCounter++;
    this.name = name;
    this.tasks = [];
  }
}

class Task {
  static taskIdCounter = 0;

  constructor(projectID, name, date, description, status, priority) {
    this.id = Task.taskIdCounter++;
    this.projectID = projectID;
    this.name = name;
    this.date = date;
    this.description = description;
    this.status = status;
    this.priority = priority;
  }
}

export default class User {
  static users = [];

  constructor(nick) {
    this.nick = nick;
    this.projects = [];
    User.users.push(this);
  }

  createProject(name) {
    let project = new Project(name);
    this.projects.push(project);
  }

  createTask(projectID, name, date, description, status = false, priority) {
    let task = new Task(projectID, name, date, description, status, priority);
    this.projects[projectID].tasks.push(task);
  }

  removeProject(projectID) {
    this.projects.splice(projectID, 1);
  }

  removeTask(projectID, taskIndex) {
    this.projects[projectID].tasks.splice(taskIndex, 1);
  }
}
