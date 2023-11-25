export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init(this.model.projects, this.model.selectedProject); // Display initial project
  }
  // Initialization

  init = (projects, selectedProject) => {
    this.view.displayProjects(projects, selectedProject);

    this.view.bindSelectProject(this.handleSelectProject);
    this.view.bindAddProject(this.handleAddProject);

    this.view.bindSelectTask(this.handleSelectTask);
    this.view.bindAddTask(this.handleAddTask, selectedProject.id);
    this.view.bindDeleteTask(this.handleDeleteTask);
    this.view.bindToggleTask(this.handleToggleTask);
    this.view.bindEditTask(this.handleEditTask, selectedProject.id);
  };

  // Project handling

  //select
  handleSelectProject = (id) => {
    this.model.selectProject(id);
    this.view.displayTasks(this.model.selectedProject);
  };
  //add
  handleAddProject = (projectText) => {
    this.model.addProject(projectText);
    this.view.displayProjects(this.model.projects, this.model.selectedProject);
  };

  // Task handling

  //select
  handleSelectTask = (dataProjectID, tabID) => {
    //double check data
    if (dataProjectID === this.model.selectedProject.id) {
      this.model.selectedTask = this.model.projects[dataProjectID].tasks[tabID];
    } else {
      console.error(
        "The dataProjectID does not match the selectedProject.id. Unable to set selectedTask."
      );
    }
  };
  //add
  handleAddTask = (projectID, title, date, description, priority) => {
    projectID = this.model.selectedProject.id;
    this.model.addTask(projectID, title, date, description, priority);
    this.view.displayTasks(this.model.selectedProject);
  };
  //remove
  handleDeleteTask = (tabID) => {
    this.model.deleteTask(
      this.model.selectedProject.id,
      this.model.selectedTask.id
    );
  };
  //toggle
  handleToggleTask = () => {
    this.model.selectedTask.toggleTaskStatus();
  };
  //edit
  handleEditTask = (projectID, title, date, description, priority) => {
    projectID = this.model.selectedProject.id;
    console.log(projectID);
    console.log(this.model.selectedTask.id);
    this.model.projects[projectID].tasks[this.model.selectedTask.id].editTask(
      title,
      date,
      description,
      priority
    );
    this.view.displayTasks(this.model.selectedProject);
  };
}
