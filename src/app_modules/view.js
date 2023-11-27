import { ToggleVisibilityBtn } from "./view_components/buttons";
import {
  TaskFormHandler,
  ProjectFormHandler,
  ExtendedTaskFormHandler,
} from "./view_components/forms";
import { ProjectDisplay, TaskDisplay } from "./view_components/display";
import Modal from "./view_components/modal.js";
import { ContainerHandler, ULHandler, LiHandler, Action } from "./handlers";

export default class View {
  constructor() {
    // DOM elements
    this.projectUL = document.querySelector("ul.list-projects");
    this.projectLI = document.querySelector("li.list-item");
    this.taskUL = document.querySelector(".tasks");
    this.taskLI = document.querySelector(".tab");
    this.projectForm = document.querySelector(".form-projects");
    this.taskForm = document.querySelector(".form-tasks");
    this.dataProjectID = null;

    // Initialize
    this.init();
  }

  init() {    
// Display instances
    this.projectDisplay = new ProjectDisplay(this.projectUL, this.taskUL);
    this.taskDisplay = new TaskDisplay(this.taskUL);
    //
    new ToggleVisibilityBtn(".new-project-button", ".new-projects-box");
    new ToggleVisibilityBtn(".new-task-button", ".new-task-box");
  }

  displayProjectsAndTasks(projects, activeProjectID) {
    const displayTasksCallback = this.taskDisplay.displayTasks.bind(this.taskDisplay);
    this.projectDisplay.displayProjects(projects, activeProjectID, displayTasksCallback);
  }

  // Project binders
  bindSelectProject(cHandler) {
    this.projectULHandler = new ULHandler(this.projectUL, cHandler);
  }

  bindAddProject(cHandler) {
    new ProjectFormHandler(this.projectForm, cHandler);
  }

  bindDeleteProject(cHandler) {
    this.projectULHandler.createLiHandler().createDeleteHandler(cHandler);
  }

  bindEditProject(cHandler) {
    this.projectULHandler.createLiHandler().createEditHandler(cHandler, ".form-projects", "#editModalOverlay");
  }

  // Task binders
  bindAddTask(cHandler) {
    new TaskFormHandler(this.taskForm, cHandler);
  }

  bindDeleteTask(cHandler) {
    this.taskULHandler = new ULHandler(this.taskUL);
    this.taskULHandler.createLiHandler().createDeleteHandler(cHandler);
  }

  bindToggleTaskPriority(cHandler) {
    this.taskULHandler.createLiHandler().createPriorityHandler(cHandler);
  }

  bindToggleTaskComplete(cHandler) {
    this.taskULHandler.createLiHandler().createCompleteHandler(cHandler);
  }

  bindEditTask(cHandler) {
    this.taskULHandler.createLiHandler().createEditHandler(cHandler, ".form-tasks", "#editModalOverlay");
  }
}

class ContainerHandler {
  constructor(container) {
    this.container = container;
    this.conEventTarget = null;
  }
  
  listen() {
    this.container.addEventListener("click", (event) => {
      this.conEventTarget = event.target;
      this.handleEvent();
    });
  }
  
}

class ULHandler extends ContainerHandler {
  constructor(container, cHandler) {
    super(container);
    this.liClassName = this.getLIClassName();
    this.projectID = null;
    this.cHandler = cHandler;
    this.listen();
  }

  createLiHandler() {
    return new LiHandler(this.container);
  }

  handleEvent() {
    console.log("Click event handled by ULHandler");
    console.log("Event target:", this.conEventTarget);
    this.selectProject();
  }

  getLIClassName() {
    const firstChild = this.container?.firstElementChild;
    if (firstChild) {
      return firstChild.classList[0];
    } else {
      console.error(this.container, "has no children");
      return null;
    }
  }

  selectProject() {
    if (this.conEventTarget) {
      const closestListItem = this.conEventTarget.closest(`.${this.liClassName}`);
      if (closestListItem) {
        this.projectID = closestListItem.getAttribute("data-project-id");
        if (this.cHandler) this.cHandler(this.projectID);
      }
    }
  }
}

class LiHandler extends ULHandler {
  constructor(container) {
    super(container);
    this.liElement = null;
    this.handlers = [];
  }

  handleEvent() {
    this.liElement = this.conEventTarget.closest(`.${this.liClassName}`);
    this.projectID = this.liElement.getAttribute("data-project-id");
    this.taskID = this.liElement.getAttribute("data-task-id");

    const matchedHandler = this.handlers.find(
      (handler) => this.conEventTarget.classList.contains(handler.buttonClass)
    );

    if (matchedHandler) {
      matchedHandler.action(this.projectID, this.taskID);
    }
  }

  createHandler(handlerType, buttonClass) {
    const newHandler = new handlerType(this.handler);
    newHandler.buttonClass = buttonClass;
    this.handlers.push(newHandler);
  }

  createDeleteHandler() {
    this.createHandler(Delete, "close-btn");
  }

  createPriorityHandler() {
    this.createHandler(Priority, "important-btn");
  }

  createCompleteHandler() {
    this.createHandler(Complete, "check-btn");
  }

  createEditHandler(formSelector, modalSelector) {
    const newEditHandler = new Edit(
      this.handler,
      formSelector,
      modalSelector,
      this.container
    );
    newEditHandler.buttonClass = "edit-btn";
    this.handlers.push(newEditHandler);
  }
}

class Action {
  constructor(handler) {
    this.handler = handler;
  }
}

class Delete extends Action {
  action(projectID, taskID) {
    this.handler(projectID, taskID);
  }
}

class Priority extends Action {
  action(projectID, taskID) {
    this.handler(projectID, taskID);
  }
}

class Complete extends Action {
  action(projectID, taskID) {
    this.handler(projectID, taskID);
  }
}

class Edit extends Action {
  constructor(handler, formSelector, modalSelector, container) {
    super(handler);
    this.formSelector = formSelector;
    this.modalSelector = modalSelector;
    this.container = container;
  }

  action(projectID, taskID) {
    console.log("action for:", this.container);
    console.log("action proID:", projectID);
    const modal = new Modal(this.modalSelector);
    modal.show();

    const form = document.querySelector(this.formSelector);
    const formClone = form.cloneNode(true);
    formClone.classList.remove(this.formSelector.substring(1));
    formClone.classList.add("edit-task_" + this.formSelector.substring(1));

    modal.append(formClone);

    const taskForm = new ExtendedTaskFormHandler(
      formClone,
      this.handler,
      projectID,
      taskID,
      modal
    );
  }
}
