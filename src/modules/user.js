//controller for creating users and their projects and tasks

// construct Projects

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}

// construct Tasks for Projects

class Task {
  constructor(name, date, description, status) {
    this.name = name;
    this.date = date;
    this.description = description;
    this.status = status;
  }
}

// construct User

class User {
  static users = [];

  constructor(nick) {
    this.nick = nick;
    this.projects = [];
    User.users.push(this);
  }
  createProject() {
    let name = prompt("Please enter Project name:");
    let project = new Project(name);
    this.projects.push(project);
  }
  createTask() {
    let index = prompt("Project index:");
    let name = prompt("Please enter Task name:");
    let date = prompt("Please enter Task date:");
    let description = prompt("Please enter Task description:");
    let task = new Task(name, date, description);
    if (index !== "") this.projects[index].tasks.push(task); //push task to selected project's tasks array
  }
}

//

function createUser(name) {
  const defaultProject = new Project("Default");
  const defaultTask = new Task({
    name: "Example Task",
    date: "01/01/2001",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    status: undefined,
  });
  defaultProject.tasks.push(defaultTask);

  const user = new User(`${name}`);
  user.projects.push(defaultProject);

  return user;
}

export { createUser };
