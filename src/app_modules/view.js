import { ToggleVisibilityBtn, PlusToggleBtn } from "./view_components/buttons";
import { TaskFormHandler, ProjectFormHandler } from "./view_components/forms";
import { ProjectDisplay, TaskDisplay } from "./view_components/display";
import { ULHandler } from "./view_components/handlers";

export default class View {
  constructor() {
    // DOM elements
    this.projectUL = document.querySelector("ul.list-projects");
    this.taskUL = document.querySelector(".tasks");
    this.projectForm = document.querySelector(".form-projects");
    this.taskForm = document.querySelector(".form-tasks");

    // Initialize
    this.init();
  }

  init() {
    // Display instances
    this.projectDisplay = new ProjectDisplay(this.projectUL, this.taskUL);
    this.taskDisplay = new TaskDisplay(this.taskUL);

    // Toggle buttons
    new PlusToggleBtn(".new-project-button", ".box-new-project");
    new PlusToggleBtn(".new-task-button", ".box-new-task");
    new ToggleVisibilityBtn("button.bi.bi-list", "aside");
  }

  displayProjectsAndTasks(projects, activeProjectID) {
    const displayTasksCallback = this.taskDisplay.displayTasks.bind(
      this.taskDisplay
    );
    this.projectDisplay.displayProjects(
      projects,
      activeProjectID,
      displayTasksCallback
    );
  }

  // Binders

  bindSelectProject(cHandler) {
    this.projectULHandler = new ULHandler(this.projectUL, cHandler);
  }

  bindAddProject(cHandler) {
    new ProjectFormHandler(this.projectForm, cHandler);
  }

  bindDeleteProject(cHandler) {
    this.projectULHandler.createLiHandler.createDeleteHandler(cHandler);
  }

  bindEditProject(cHandler) {
    this.projectULHandler.createLiHandler.createEditHandler(
      cHandler,
      ".form-projects",
      "#editModalForm"
    );
  }

  // Task Binders

  bindAddTask(cHandler) {
    new TaskFormHandler(this.taskForm, cHandler);
  }

  bindDeleteTask(cHandler) {
    this.taskULHandler = new ULHandler(this.taskUL);
    this.taskULHandler.createLiHandler.createDeleteHandler(cHandler);
  }

  bindToggleTaskPriority(cHandler) {
    this.taskULHandler.createLiHandler.createPriorityHandler(cHandler);
  }

  bindToggleTaskComplete(cHandler) {
    this.taskULHandler.createLiHandler.createCompleteHandler(cHandler);
  }

  bindEditTask(cHandler) {
    this.taskULHandler.createLiHandler.createEditHandler(
      cHandler,
      ".form-tasks",
      "#editModalForm"
    );
  }
}
