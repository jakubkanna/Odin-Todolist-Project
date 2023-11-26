import {
  createTabBtnSet,
  ToggleVisibilityBtn,
} from "./view_components/buttons";
import {
  TaskFormHandler,
  ProjectFormHandler,
  ExtendedTaskFormHandler,
} from "./view_components/forms";

export default class View {
  constructor() {
    this.projectUL = document.querySelector("ul.list-projects");
    this.projectLI;
    this.taskUL = document.querySelector(".tasks");
    this.taskLI;
    this.dataProjectID = 0; //default
    this.dataTaskID = 0; //default
    this.projectForm = document.querySelector(".form-projects");
    this.taskForm = document.querySelector(".form-tasks");

    this.init();
  }

  //Initialization

  init() {
    new ToggleVisibilityBtn(".new-project-button", ".new-projects-box");
    new ToggleVisibilityBtn(".new-task-button", ".new-task-box");
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

  // Display logic

  displayProjects(projects, activeProjectID) {
    // console.log(activeProjectID, projects);
    // console.log(projects[activeProjectID]);
    //clean dom
    while (this.projectUL.firstChild) {
      this.projectUL.removeChild(this.projectUL.firstChild);
    }
    // Show default message
    if (projects.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Empty";
      this.projectUL.append(p);
    }
    //create list
    else {
      projects.forEach((project) => {
        const li = this.createElement("li");
        li.classList.add("list-item");

        li.setAttribute("data-project-id", project.id);
        const span = this.createElement("span");
        span.textContent = project.title;
        li.append(span);
        this.projectUL.append(li);

        this.displayTasks(projects[activeProjectID]);
      });
    }
  }

  displayTasks(project) {
    // Clear existing tasks
    this.taskUL.innerHTML = "";
    // console.log(project);
    if (project.tasks.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Empty";
      this.taskUL.append(p);
    } else {
      project.tasks.forEach((task) => {
        const li = this.createElement("li");
        li.classList.add("tab");
        li.setAttribute("data-project-id", project.id);
        li.setAttribute("data-task-id", task.id);

        // Title
        const titleSpan = this.createElement("span");
        titleSpan.textContent = task.title;
        titleSpan.classList.add("tab-content-field");
        li.append(titleSpan);

        // Date
        const dateSpan = this.createElement("span");
        dateSpan.textContent = task.date;
        dateSpan.classList.add("tab-content-field", "date-field");

        li.append(dateSpan);

        // Settings
        const settingsDiv = this.createElement("div");
        const buttons = createTabBtnSet(); // Create a new set of buttons for each task
        buttons.forEach((button) => {
          settingsDiv.append(button.getElement());
        });
        settingsDiv.classList.add("tab-content-field");

        li.append(settingsDiv);

        // Description
        const descriptionDiv = this.createElement("span");
        descriptionDiv.textContent = task.description;
        descriptionDiv.classList.add("tab-content-field");

        li.append(descriptionDiv);

        this.taskUL.append(li);

        if (task.priority === "yes") {
          li.classList.add("important");
        }
        if (task.status === true) {
          li.classList.add("complete");
        }
      });
    }
  }

  //binders
  bindSelectProject(cHandler) {
    this.projectLI = document.querySelector("li.list-item"); // update
    new ProjectSelector(this.projectUL, this.projectLI, cHandler);
  }

  bindAddProject(cHandler) {
    new ProjectFormHandler(this.projectForm, cHandler);
  }

  bindAddTask(cHandler, selectedProjectID) {
    new TaskFormHandler(this.taskForm, cHandler, selectedProjectID);
  }

  bindDeleteTask(cHandler) {
    this.taskUL = document.querySelector(".tasks");
    new RemoveHandler(this.taskUL, cHandler, "close-btn");
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

///

class Modal {
  constructor(element) {
    this.element = document.querySelector(element);
  }
  hide() {
    this.element.style.display = "none";
    this.element.classList.remove("active");
  }
  show() {
    if (!this.element.classList.contains("active")) {
      this.element.style.display = "block";
      this.element.classList.add("active");
    }
  }
  append(child) {
    this.element.append(child);
  }
}

class ProjectBase {
  constructor(container, handler) {
    this.container = container;
    this.handler = handler;
  }
}

class ProjectSelector extends ProjectBase {
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
        this.projectId = parseInt(
          clickedProject.getAttribute("data-project-id")
        );
      }
      if (this.handler) this.handler(this.projectId);
    });
  }
}

class TaskManager extends ProjectBase {
  constructor(container, handler, buttonClass) {
    super(container, handler);
    this.buttonClass = buttonClass;
    this.projectId = null;
    this.taskId = null;
  }
}

class RemoveHandler extends TaskManager {
  constructor(container, handler, buttonClass) {
    super(container, handler, buttonClass);

    this.buttonClass = buttonClass;

    this.performDeleteAction();
  }
  performDeleteAction() {
    this.container.addEventListener("click", (e) => {
      this.taskTab = e.target.parentElement.parentElement;
      this.projectId = parseInt(this.taskTab.getAttribute("data-project-id"));
      this.taskId = parseInt(this.taskTab.getAttribute("data-task-id"));
      if (e.target.classList.contains(this.buttonClass)) {
        this.taskTab.remove();
        this.handler(this.projectId, this.taskId);
      }
    });
    return;
  }
}

class ToggleHandler extends TaskManager {
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
class CompleteHandler extends TaskManager {
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

class EditHandler extends TaskManager {
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
