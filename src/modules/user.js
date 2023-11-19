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
  createTask(projectIndex, name, date, description, status, priority) {
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
  const defaultProject = new Project("Default");
  const defaultTask = new Task({
    name: "Example Task",
    date: "01/01/2001",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    status: undefined,
    priority: undefined,
  });

  defaultProject.tasks.push(defaultTask);

  const user = new User(`${name}`);
  user.projects.push(defaultProject);

  return user;
}

export { createUser };
