export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onProjectChanged(this.model.projects, this.model.activeProjectID);

    this.model.bindProjectChanged(this.onProjectChanged);

    this.view.bindSelectProject(this.handleSelectProject);
    this.view.bindAddProject(this.handleAddProject);
    this.view.bindDeleteProject(this.handleDeleteProject);
    // this.view.bindEditProject(this.handleEditProject); //unfinished

    this.view.bindAddTask(this.handleAddTask, this.model.activeProjectID);
    this.view.bindDeleteTask(this.handleDeleteTask);
    this.view.bindToggleTaskPriority(this.handleTaskPriority);
    this.view.bindToggleTaskComplete(this.handleTaskComplete);
    this.view.bindEditTask(this.handleEditTask);
  }

  // Initialization

  onProjectChanged = (projects, activeProjectID) => {
    this.view.projectDisplay.displayProjects(
      projects,
      activeProjectID,
      (project) => this.view.taskDisplay.displayTasks(project)
    );
  };

  //handlers

  handleSelectProject = (id) => {
    this.model.selectProject(id);
  };

  handleAddProject = (projectText) => {
    this.model.addProject(projectText);
  };

  handleDeleteProject = (id) => {
    this.model.deleteProject(id);
  };
  handleEditProject = (id, text) => {
    this.model.editProject(id, text);
  };
  handleAddTask = (title, date, description, status, priority) => {
    this.model.addTask(
      this.model.activeProjectID,
      title,
      date,
      description,
      status,
      priority
    );
  };

  handleDeleteTask = (projectID, taskID) => {
    this.model.deleteTask(projectID, taskID);
  };

  handleTaskPriority = (projectID, taskID) => {
    this.model.toggleTaskPriority(projectID, taskID);
  };

  handleTaskComplete = (projectID, taskID) => {
    this.model.toggleTaskComplete(projectID, taskID);
  };

  handleEditTask = (
    projectID,
    taskID,
    title,
    date,
    description,
    status,
    priority
  ) => {
    // console.log(projectID, taskID);
    this.model.editTask(
      projectID,
      taskID,
      title,
      date,
      description,
      status,
      priority
    );
  };
}
