export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init(this.model.projects, this.model.selectedProject); // Display initial project
  }

  init = (projects, selectedProject) => {
    this.view.displayProjects(projects, selectedProject);
    this.view.bindSelectProject(this.handleSelectProject);
    this.view.bindAddProject(this.handleAddProject);
    this.view.bindAddTask(this.handleAddTask, selectedProject.id);
  };

  //project
  handleSelectProject = (id) => {
    this.model.selectProject(id);
    this.view.displayTasks(this.model.selectedProject);
  };

  handleSelectTask = (id) => {
    this.model.handleSelectTask(id);
  };

  handleAddProject = (projectText) => {
    this.model.addProject(projectText);
    this.view.displayProjects(this.model.projects, this.model.selectedProject);
  };

  //task
  handleAddTask = (projectID, title, date, description, status, priority) => {
    this.model.addTask(projectID, title, date, description, status, priority);
    this.view.displayTasks(this.model.selectedProject);
  };

  handleEditTask = (id, todoText) => {
    this.model.editTask(id, todoText);
  };

  handleDeleteTask = (id) => {
    this.model.deleteTask(id);
  };

  handleToggleTask = (id) => {
    this.model.toggleTask(id);
  };
}
