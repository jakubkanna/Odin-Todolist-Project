import { ToggleVisibilityBtn } from "./view_components/buttons";
import {
  TaskFormHandler,
  ProjectFormHandler,
  ExtendedTaskFormHandler,
} from "./view_components/forms";
import { ProjectDisplay, TaskDisplay } from "./view_components/display";
import Modal from "./view_components/modal.js";

export default class View {
  constructor() {
    this.projectUL = document.querySelector("ul.list-projects");
    this.projectLI = document.querySelector("li.list-item");
    this.taskUL = document.querySelector(".tasks");
    this.taskLI = document.querySelector(".tab");
    this.projectForm = document.querySelector(".form-projects");
    this.taskForm = document.querySelector(".form-tasks");
    this.dataProjectID;

    this.projectDisplay = new ProjectDisplay(this.projectUL, this.taskUL);
    this.taskDisplay = new TaskDisplay(this.taskUL);

    this._temporaryProjectText;

    this.init();
  }

  init() {
    new ToggleVisibilityBtn(".new-project-button", ".new-projects-box");
    new ToggleVisibilityBtn(".new-task-button", ".new-task-box");

    this._initLocalListeners();
  }
  _initLocalListeners() {
    this.projectUL.addEventListener("input", (event) => {
      if (event.target.className === "editable") {
        this._temporaryProjectText = event.target.innerText;
      }
    });
  }
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }
  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
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

  //binders
  bindSelectProject(cHandler) {
    this.projectUL = document.querySelector("ul.list-projects");
    this.projectLI = document.querySelector("li.list-item");

    this.projectULHandler = new ProjectContainerHandler(
      this.projectUL,
      cHandler
    );
  }
  bindAddProject(cHandler) {
    new ProjectFormHandler(this.projectForm, cHandler);
  }
  bindDeleteProject(cHandler) {
    this.projectUL = document.querySelector("ul.list-projects");
    this.projectULHandler.projectLiHandler().deleteHandler(cHandler);
  }
  bindEditProject(cHandler) {
    this.projectUL = document.querySelector("ul.list-projects");
  }
  bindAddTask(cHandler) {
    new TaskFormHandler(this.taskForm, cHandler);
  }

  bindDeleteTask(cHandler) {
    this.taskUL = document.querySelector(".tasks");
  }
  bindToggleTaskPriority(cHandler) {
    this.taskUL = document.querySelector(".tasks");
  }

  bindToggleTaskComplete(cHandler) {
    this.taskUL = document.querySelector(".tasks");
  }

  bindEditTask(cHandler) {
    this.taskUL = document.querySelector(".tasks");
  }
}

//ContainerHandler class
//add listener to container  constructor(projectUL) / constructor(taskUL)
//save event target each time it's pressed this.conEventTarget
//add method to get projectLI/taskLI classname
//ProjectContainerHandler extends ContainerHandler, TaskContainerHandler extends ContainerHandler
//getLIClassName = projectLiClassName, taskLiClassName
//ProjectContainerHandler has method selectProject if(this.conEventTarget.className === projectLiClassName) call handler
//ProjectLiHandler extends ProjectContainerHandler
//TaskLiHandler extends TaskContainerHandler

//create Handlers: Add, Delete, Edit, Complete, Priority which will have own action(handler) method

//projectlihandler should have delete
//tasklihandler should have priority, complete, edit, delete

//if this.conEventTarget === button.classList pressed inside each contains class close-btn create delete handler for it
//

class ContainerHandler {
  constructor(container) {
    this.container = container;
    this.conEventTarget = null;
    this.listen();
  }

  listen() {
    this.container.addEventListener("click", (event) => {
      this.conEventTarget = event.target;
      // console.log(this.container);

      this.handleEvent();
    });
  }

  handleEvent() {
    // To be implemented by subclasses
  }
}

class ProjectContainerHandler extends ContainerHandler {
  constructor(container, cHandler) {
    super(container);
    this.liClassName = this.getLIClassName();
    this.projectID = null; // Add this line to declare projectID
    this.cHandler = cHandler;
  }
  projectLiHandler() {
    return new ProjectLiHandler(this.container);
  }
  handleEvent() {
    // Customize handling here if needed
    this.selectProject();
  }

  getLIClassName() {
    if (this.container) {
      return this.container.firstElementChild.className;
    } else {
      console.error(this.container, "has no children");
      return null;
    }
  }

  selectProject() {
    // console.log(cHandler);
    if (this.conEventTarget) {
      const closestListItem = this.conEventTarget.closest(
        `.${this.liClassName}`
      );
      if (closestListItem) {
        this.projectID = closestListItem.getAttribute("data-project-id");
        this.cHandler(this.projectID);
      }
    }
  }
}
class ProjectLiHandler extends ProjectContainerHandler {
  constructor(container) {
    super(container);
    this.liElement = null;
    this.button = null;
    this.handlers = []; //add new handlers here
  }
  deleteHandler(handler) {
    const deleteHandler = new Delete(handler);
    this.handlers.push(deleteHandler);
  }
  selectProject() {}
  handleEvent() {
    this.liElement = this.conEventTarget.closest(`.${this.liClassName}`);
    this.deleteButton = this.liElement.querySelector("button.close-btn");
    this.projectID = this.liElement.getAttribute("data-project-id");

    // Match clicked button class with handler
    const matchedHandler = this.handlers.find((handler) =>
      this.conEventTarget.classList.contains(handler.buttonClass)
    );
    console.log(matchedHandler);

    // Do action for the matched handler
    if (matchedHandler) {
      matchedHandler.action(this.projectID);
    }
  }
}

class Action {
  constructor() {}
}

class Delete extends Action {
  constructor(handler) {
    super();
    this.handler = handler;
    this.buttonClass = "close-btn";
  }

  action(projectID, taskID) {
    console.log(projectID, taskID);
    this.handler(projectID, taskID);
  }
}
