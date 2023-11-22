// users has projects, projects has tasks

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}

//

class Task {
  constructor(name, date, description, status, priority) {
    this.name = name;
    this.date = date;
    this.description = description;
    this.status = status;
    this.priority = priority;
  }
}

// user can create projects and tasks

class User {
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
  createTask(projectIndex, name, date, description, status = false, priority) {
    let task = new Task(name, date, description, status, priority);
    this.projects[projectIndex].tasks.push(task);
  }
  removeProject(projectIndex) {
    this.projects.splice(projectIndex, 1);
  }
  removeTask(projectIndex, taskIndex) {
    this.projects[projectIndex].tasks.splice(taskIndex, 1);
  }
}

// create users with default values

function createUser(name) {
  const user = new User(`${name}`);

  user.createProject("Default");
  user.createProject("Default2");

  user.createTask(0, "Example Task", "01/01/2001", "Description", false, "yes");

  return user;
}

export { createUser };
