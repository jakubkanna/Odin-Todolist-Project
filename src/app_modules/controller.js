export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onProjectChanged(this.model.projects, this.model.activeProjectID);

    this.model.bindProjectChanged(this.onProjectChanged);

    this.view.bindSelectProject(this.handleSelectProject);
    this.view.bindAddProject(this.handleAddProject);
    // console.log(this.model.activeProjectID);
    this.view.bindAddTask(this.handleAddTask, this.model.activeProjectID);
    this.view.bindDeleteTask(this.handleDeleteTask);
    this.view.bindToggleTaskPriority(this.handleTaskPriority);
    this.view.bindToggleTaskComplete(this.handleTaskComplete);
    this.view.bindEditTask(this.handleEditTask);
  }
  // Initialization

  onProjectChanged = (projects, activeProjectID) => {
    this.view.displayProjects(projects, activeProjectID);
  };

  //handlers

  handleSelectProject = (id) => {
    this.model.selectProject(id);
  };

  handleAddProject = (projectText) => {
    this.model.addProject(projectText);
    this.view.displayProjects(this.model.projects, this.model.activeProjectID);
  };

  handleSelectTask = (tabID) => {
    if (this.view.dataProjectID === this.model.activeProjectID) {
      this.model.activeTaskID = tabID;
    } else {
      console.error(
        "The dataProjectID does not match the activeProjectID. Unable to set selectedTask."
      );
    }
  };

  handleAddTask = (projectID, title, date, description, status, priority) => {
    this.model.addTask(projectID, title, date, description, status, priority);
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
