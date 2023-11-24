import { createTabButtons, CollapsibleBtn } from "./view_components/buttons";
import { TaskForm, ProjectForm } from "./view_components/forms";

export default class View {
  constructor() {
    this.projectList = document.querySelector("ul.list-projects");
    this.taskList = document.querySelector("div.tasks");
    this.projectForm = document.querySelector("form.form-projects");
    this.taskWindowBox = document.querySelector(".new-task-box > .box-body");
    this.editFormModal = document.getElementById("#editModalOverlay");
    this.form = new TaskForm("form", "form-tasks", this.taskWindowBox);
    this.taskForm = this.form.formElement;

    this.init();
  }

  //Initialization

  init() {
    new CollapsibleBtn(".new-project-button", ".new-projects-box");
    new CollapsibleBtn(".new-task-button", ".new-task-box");
    this.form.generateTaskForm();
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

  displayProjects(projects, selectedProject) {
    //clean dom
    while (this.projectList.firstChild) {
      this.projectList.removeChild(this.projectList.firstChild);
    }
    // Show default message
    if (projects.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Empty";
      this.projectList.append(p);
    }
    //create list
    else {
      projects.forEach((project) => {
        const li = this.createElement("li");
        li.classList.add("list-item");

        li.id = project.id;
        const span = this.createElement("span");
        span.textContent = project.title;
        li.append(span);
        this.projectList.append(li);

        this.displayTasks(selectedProject);
      });
    }
  }

  displayTasks(project) {
    // Clear existing tasks
    this.taskList.innerHTML = "";

    project.tasks.forEach((task) => {
      const li = this.createElement("li");
      li.classList.add("tab");
      li.setAttribute("data-project-id", project.id);
      li.id = task.id;

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
      const buttons = createTabButtons(); // Create a new set of buttons for each task
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

      this.taskList.append(li);
    });
  }

  //Bind DOM to controller

  bindSelectProject(handler) {
    this.projectList.addEventListener("click", (event) => {
      const id = event.target.closest("li").id;
      handler(id); //handlers handle data
    });
  }
  bindAddProject(handler) {
    // new Form(this.projectForm, handler).handleProjectForm();
  }

  bindSelectTask(handler) {
    this.taskList.addEventListener("click", (event) => {
      const tab = event.target.closest(".tab");
      const tabID = tab.id;
      const dataProjectID = tab.getAttribute("data-project-id");
      handler(dataProjectID, tabID);
    });
  }

  bindAddTask(handler, selectedProjectID) {
    // this.taskForm.handleTaskForm(handler, selectedProjectID);
  }

  bindDeleteTask(handler) {
    //add handler on delete button
    this.taskList.addEventListener("click", (event) => {
      const tab = event.target.closest(".tab");
      if (event.target.className === "close-btn bi bi-x-lg") {
        tab.remove();
        handler();
      }
    });
  }
  bindToggleTask(handler) {
    this.taskList.addEventListener("click", (event) => {
      const tab = event.target.closest(".tab");
      if (event.target.classList.contains("important-btn")) {
        tab.classList.toggle("important");
        handler();
      }
    });
  }
  bindEditTask(handler) {
    this.taskList.addEventListener("click", (event) => {
      const tab = event.target.closest(".tab");
      if (event.target.classList.contains("edit-btn")) {
        //open modal form
        handler();
      }
    });
  }
}
