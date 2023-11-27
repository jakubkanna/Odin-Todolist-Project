export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();

    this.model.bindProjectChanged(this.onProjectChanged);

    this.view.bindSelectProject(this.handleSelectProject);
    this.view.bindAddProject(this.handleAddProject);
    this.view.bindDeleteProject(this.handleDeleteProject);
    this.view.bindEditProject(this.handleEditProject);

    this.view.bindAddTask(this.handleAddTask);
    this.view.bindDeleteTask(this.handleDeleteTask);
    this.view.bindToggleTaskPriority(this.handleTaskPriority);
    this.view.bindToggleTaskComplete(this.handleTaskComplete);
    this.view.bindEditTask(this.handleEditTask);
  }

  init() {
    this.onProjectChanged(this.model.projects, this.model.activeProjectID);
  }

  onProjectChanged = (projects, activeProjectID) => {
    this.view.projectDisplay.displayProjects(
      projects,
      activeProjectID,
      (project) => this.view.taskDisplay.displayTasks(project)
    );
  };

  handleSelectProject = (id) => {
    this.model.selectProject(id);
  };

  handleAddProject = (projectText) => {
    this.model.addProject(projectText);
  };

  handleDeleteProject = (id) => {
    this.model.deleteProject(id);
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

  handleEditTask = (projectID, formData, taskID) => {
    const [title = "", date = "", description = "", priority = ""] = formData;
    this.model.editTask(projectID, title, date, description, priority, taskID);
  };

  handleEditProject = (id, text) => {
    const textString = text.toString();
    this.model.editProject(id, textString);
  };
}
