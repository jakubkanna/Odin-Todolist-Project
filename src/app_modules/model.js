export default class Model {
  constructor() {
    this.projects = JSON.parse(localStorage.getItem("projects")) || [];
    if (this.projects.length === 0) this.createDefault();
    this.activeProjectID =
      JSON.parse(localStorage.getItem("activeProjectID")) || 0;
  }

  createDefault() {
    const project = new Project(0, "Default");
    const lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
    accusamus aperiam unde. Quos magni itaque distinctio consectetur
    laboriosam corporis, unde temporibus in dolorem laudantium quo minus
    quasi ducimus. Dolore, totam?`;
    const task = new Task(
      0,
      0,
      "Example Task",
      "01/01/2011",
      lorem,
      false,
      "no"
    );
    project.tasks.push(task);
    this.projects.push(project);
  }

  bindProjectChanged(callback) {
    this.onProjectChanged = callback;
  }

  _commit() {
    this.onProjectChanged(this.projects, this.activeProjectID);
    localStorage.setItem("projects", JSON.stringify(this.projects));
    localStorage.setItem(
      "activeProjectID",
      JSON.stringify(this.activeProjectID)
    );
  }

  selectProject(id) {
    this.activeProjectID = id;
    this._commit();
  }

  addProject(projectTitle) {
    const id =
      this.projects.length > 0
        ? this.projects[this.projects.length - 1].id + 1
        : 0;
    const project = new Project(id, projectTitle);
    this.projects.push(project);
    this._commit();
  }

  editProject(id, text) {
    const project = this.getProject(id);
    if (project) {
      project.title = text;
      this._commit();
    }
  }

  deleteProject(id) {
    const projectIndex = this.projects.findIndex(
      (item) => item.id === parseInt(id)
    );
    if (projectIndex !== -1) {
      this.projects.splice(projectIndex, 1);
    } else {
      console.error(`Project with id ${id} not found.`);
    }
    this.activeProjectID = 0;
    this._commit();
  }

  getProject(id) {
    return this.projects.find((item) => item.id === parseInt(id));
  }

  getTask(projectID, taskID) {
    const project = this.getProject(projectID);
    const task = project
      ? project.tasks.find((item) => item.id === parseInt(taskID))
      : null;

    return {
      task,
      project,
    };
  }

  addTask(projectID, title, date, description, status, priority) {
    const project = this.getProject(projectID);

    if (project) {
      const taskID =
        project.tasks.length > 0
          ? project.tasks[project.tasks.length - 1].id + 1
          : 0;
      const task = new Task(
        project.id,
        taskID,
        title,
        date,
        description,
        status,
        priority
      );
      project.tasks.push(task);
      this._commit();
    }
  }

  deleteTask(projectID, taskID) {
    const { task, project } = this.getTask(projectID, taskID);

    if (project && task) {
      project.tasks = project.tasks.filter((item) => item !== task);
      this._commit();
    }
  }

  toggleTaskPriority(projectID, taskID) {
    const { task } = this.getTask(projectID, taskID);

    if (task) {
      task.priority = task.priority === "no" ? "yes" : "no";
      this._commit();
    }
  }

  toggleTaskComplete(projectID, taskID) {
    const { task } = this.getTask(projectID, taskID);

    if (task) {
      task.status = !task.status;
      this._commit();
    }
  }

  editTask(projectID, taskID, taskData) {
    const { task } = this.getTask(projectID, taskID);

    if (task) {
      Object.keys(taskData).forEach((key) => {
        if (taskData[key] !== null) {
          task[key] = taskData[key];
        }
      });

      this._commit();
    }
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
