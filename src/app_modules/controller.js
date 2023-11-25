export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.onProjectChanged(this.model.projects, this.model.selectedProject);
    this.view.bindSelectProject(this.handleSelectProject);
    this.view.bindAddProject(this.handleAddProject);
    this.view.bindSelectTask(this.handleSelectTask);
    this.view.bindAddTask(this.handleAddTask, this.model.selectedProject.id);
    this.view.bindDeleteTask(this.handleDeleteTask);
    this.view.bindToggleTaskPriority(this.handleToggleTaskPriority);
    this.view.bindEditTask(this.handleEditTask, this.model.selectedProject.id);
    this.view.bindCompleteTask(this.handleCompleteTask);
    this.model.bindProjectChanged(this.onProjectChanged);
  }
  // Initialization

  onProjectChanged = (projects, selectedProject) => {
    this.view.displayProjects(projects, selectedProject);
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
  handleAddTask = (projectID, title, date, description, status, priority) => {
    projectID = this.model.selectedProject.id;
    this.model.addTask(projectID, title, date, description, status, priority);
    this.view.displayTasks(this.model.selectedProject);
    if (priority === "yes") {
      this.view.addImportantClass(this.model.selectedTask.id); //id of the task
    }
  };
  //remove
  handleDeleteTask = () => {
    this.model.deleteTask(
      this.model.selectedProject.id,
      this.model.selectedTask.id
    );
  };
  //toggle
  handleToggleTaskPriority = () => {
    this.model.selectedTask.toggleTaskPriority();
  };
  //edit
  handleEditTask = (projectID, title, date, description, priority) => {
    projectID = this.model.selectedProject.id;
    this.model.projects[projectID].tasks[this.model.selectedTask.id].editTask(
      title,
      date,
      description,
      priority
    );
    this.view.displayTasks(this.model.selectedProject);
  };
  //complete
  handleCompleteTask = () => {
    this.model.selectedTask.toggleTaskComplete();
  };
}
