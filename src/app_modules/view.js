import {
  createTabBtnSet,
  ToggleVisibilityBtn,
} from "./view_components/buttons";
import { TaskForm, ProjectForm } from "./view_components/forms";

export default class View {
  constructor() {
    this.projectList = document.querySelector("ul.list-projects");
    this.taskList = document.querySelector(".tasks");
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

      this.taskList.append(li);
    });
  }

  //Bind DOM to controller

  bindSelectProject(handler) {
    this.projectList.addEventListener("click", (event) => {
      const id = parseInt(event.target.closest("li").id);
      handler(id); //handlers handle data
    });
  }
  bindAddProject(handler) {
    new ProjectForm(".form-projects", handler).handleProjectForm();
  }

  bindSelectTask(handler) {
    this.taskList.addEventListener("click", (event) => {
      const tab = event.target.closest(".tab");
      console.log(tab);
      const tabID = parseInt(tab.id);
      const dataProjectID = parseInt(tab.getAttribute("data-project-id"));
      handler(dataProjectID, tabID);
    });
  }

  bindAddTask(handler, selectedProjectID) {
    new TaskForm(".form-tasks", handler, selectedProjectID).handleTaskForm();
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
  bindEditTask(handler, selectedProjectID) {
    this.taskList.addEventListener("click", (event) => {
      if (event.target.classList.contains("edit-btn")) {
        const form = document.querySelector(".form-tasks");
        const modal = document.querySelector("#editModalOverlay");
        const form_clone = form.cloneNode(true);
        form_clone.classList.remove(".form-tasks");
        form_clone.classList.add("edit-task_form-tasks");
        modal.append(form_clone);
        const hide = true;
        new TaskForm(
          ".edit-task_form-tasks",
          handler,
          selectedProjectID
        ).handleTaskForm(hide);
      }
    });
  }
}

//when edit button click
//copy form element
//insert into modal
//assign data from modal to current task

//bind complete task

//save data in local file
