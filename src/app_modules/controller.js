export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Initialize
    this.onProjectChanged(this.model.projects, this.model.activeProjectID);
    this.model.bindProjectChanged(this.onProjectChanged);

    // Bind view events to handlers
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

  // Initialization

  onProjectChanged = (projects, activeProjectID) => {
    this.view.projectDisplay.displayProjects(
      projects,
      parseInt(activeProjectID),
      (project) => this.view.taskDisplay.displayTasks(project)
    );
  };

  // Handlers

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
    const [title, date, description, priority] = formData;
    const taskData = {
      title: title || "",
      date: date || "",
      description: description || "",
      priority: priority || "no",
    };
    this.model.editTask(projectID, taskID, taskData);
  };

  handleEditProject = (id, text) => {
    const textString = text.toString();
    this.model.editProject(id, textString);
  };
}
