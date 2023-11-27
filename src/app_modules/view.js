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
    this.projectLI;
    this.taskUL = document.querySelector(".tasks");
    this.taskLI;
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
    new ProjectSelector(this.projectUL, this.projectLI, cHandler);
  }
  bindAddProject(cHandler) {
    new ProjectFormHandler(this.projectForm, cHandler);
  }
  bindDeleteProject(cHandler) {
    this.projectUL = document.querySelector("ul.list-projects");
    new RemoveProjectHandler(this.projectUL, cHandler, "close-btn");
  }
  bindEditProject(cHandler) {
    const container = this.projectUL;
    const childrenSelector = "li.list-item";
    new EditProjectHanndler(
      container,
      childrenSelector,
      cHandler,
      this._temporaryProjectText
    );
  }
  bindAddTask(cHandler) {
    new TaskFormHandler(this.taskForm, cHandler);
  }

  bindDeleteTask(cHandler) {
    this.taskUL = document.querySelector(".tasks");
    new RemoveTaskHandler(this.taskUL, cHandler, "close-btn");
  }

  bindToggleTaskPriority(cHandler) {
    this.taskUL = document.querySelector(".tasks");

    new ToggleHandler(this.taskUL, cHandler, "important-btn");
  }

  bindToggleTaskComplete(cHandler) {
    this.taskUL = document.querySelector(".tasks");

    new CompleteHandler(this.taskUL, cHandler, "check-btn");
  }

  bindEditTask(cHandler) {
    this.taskUL = document.querySelector(".tasks");
    new EditHandler(
      this.taskUL,
      cHandler,
      "edit-btn",
      ".form-tasks",
      "#editModalOverlay"
    );
  }
}

/// could be improved

class Base {
  constructor(container, handler) {
    this.container = container;
    this.handler = handler;
  }
}

class ProjectSelector extends Base {
  constructor(container, projectElement, handler) {
    super(container, handler);
    this.projectElement = projectElement;
    this.projectId = null;
    this.setupClickEvent();
  }

  setupClickEvent() {
    this.container.addEventListener("click", (event) => {
      const clickedProject = event.target.closest(
        `.${this.projectElement.className}`
      );
      if (clickedProject) {
        let id = parseInt(clickedProject.getAttribute("data-project-id"));
        this.projectId = id;
      }
      if (this.handler) this.handler(this.projectId);
    });
  }
}

class Manager extends Base {
  constructor(container, handler, buttonClass) {
    super(container, handler);
    this.buttonClass = buttonClass;
    this.projectId = null;
    this.taskId = null;
  }
}

class RemoveTaskHandler extends Manager {
  constructor(container, handler, buttonClass) {
    super(container, handler, buttonClass);

    this.buttonClass = buttonClass;

    this.performDeleteAction();
  }

  performDeleteAction() {
    this.container.addEventListener("click", (e) => {
      this.element = e.target.parentElement.parentElement;

      // Check if element is defined before accessing its attributes
      if (this.element) {
        this.projectId = parseInt(this.element.getAttribute("data-project-id"));
        this.taskId = parseInt(this.element.getAttribute("data-task-id"));

        if (e.target.classList.contains(this.buttonClass)) {
          this.element.remove();
          this.handler(this.projectId, this.taskId);
        }
      }
    });
  }
}

class RemoveProjectHandler extends Manager {
  constructor(container, handler, buttonClass) {
    super(container, handler, buttonClass);

    this.buttonClass = buttonClass;

    this.performDeleteAction();
  }

  performDeleteAction() {
    this.container.addEventListener("click", (e) => {
      this.parentClass = this.container.firstChild.className;

      // Find the closest parent element with the specified parent class
      this.element = e.target.closest(`.${this.parentClass}`);

      // Check if element is defined before accessing its attributes
      if (this.element) {
        this.projectId = parseInt(this.element.getAttribute("data-project-id"));
        this.taskId = parseInt(this.element.getAttribute("data-task-id"));

        if (e.target.classList.contains(this.buttonClass)) {
          this.element.remove();
          this.handler(this.projectId, this.taskId);
        }
      }
    });
  }
}

class ToggleHandler extends Manager {
  constructor(container, handler, buttonClass) {
    super(container, handler, buttonClass);
    this.performToggleAction();
  }
  performToggleAction() {
    this.container.addEventListener("click", (e) => {
      this.taskTab = e.target.parentElement.parentElement;
      this.projectId = parseInt(this.taskTab.getAttribute("data-project-id"));
      this.taskId = parseInt(this.taskTab.getAttribute("data-task-id"));
      if (e.target.classList.contains(this.buttonClass)) {
        this.taskTab.classList.toggle("important");
        this.handler(this.projectId, this.taskId);
      }
    });
    return;
  }
}
class CompleteHandler extends Manager {
  constructor(container, handler, buttonClass) {
    super(container, handler, buttonClass);
    this.performToggleCompleteAction();
  }
  performToggleCompleteAction() {
    this.container.addEventListener("click", (e) => {
      this.taskTab = e.target.parentElement.parentElement;
      this.projectId = parseInt(this.taskTab.getAttribute("data-project-id"));
      this.taskId = parseInt(this.taskTab.getAttribute("data-task-id"));
      if (e.target.classList.contains(this.buttonClass)) {
        this.taskTab.classList.toggle("complete");
        this.handler(this.projectId, this.taskId);
      }
    });
    return;
  }
}

class EditHandler extends Manager {
  constructor(container, handler, buttonClass, formSelector, modalSelector) {
    super(container, handler, buttonClass);
    this.formSelector = formSelector;
    this.modalSelector = modalSelector;
    this.performEditAction();
  }

  performEditAction() {
    this.container.addEventListener("click", (e) => {
      const modal = new Modal(this.modalSelector);
      modal.show();

      const editButton = e.target.closest(`.${this.buttonClass}`);
      if (editButton) {
        const taskTab = editButton.closest(".tab");
        this.projectId = parseInt(taskTab.getAttribute("data-project-id"));
        this.taskId = parseInt(taskTab.getAttribute("data-task-id"));

        const form = document.querySelector(this.formSelector);
        const formClone = form.cloneNode(true);
        formClone.classList.remove(this.formSelector.substring(1));
        formClone.classList.add("edit-task_" + this.formSelector.substring(1));

        modal.append(formClone);

        const taskForm = new ExtendedTaskFormHandler(
          formClone,
          this.handler,
          this.projectId,
          this.taskId,
          modal
        );
      }
    });
  }
}
