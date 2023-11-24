import { createTabButtons, CollapsibleBtn } from "./view_components/buttons";
import Form from "./view_components/forms";

export default class View {
  constructor() {
    this.projectList = document.querySelector("ul.list-projects");
    this.tasksList = document.querySelector(".tasks");
    this.projectForm = document.querySelector("form.form-projects");
    this.taskForm = document.querySelector("form.form-tasks");
    this.init();
  }
  init() {
    new CollapsibleBtn(".new-project-button", ".new-projects-box");
    new CollapsibleBtn(".new-task-button", ".new-task-box");
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

        //display tasks for selected
        this.displayTasks(selectedProject);
      });
    }
  }
  displayTasks(project) {
    // Clear existing tasks
    this.tasksList.innerHTML = "";

    project.tasks.forEach((task) => {
      const li = this.createElement("li");
      li.classList.add("tab");
      li.id = task.id;

      // Title
      const titleSpan = this.createElement("span");
      titleSpan.textContent = task.title;
      li.append(titleSpan);

      // Date
      const dateSpan = this.createElement("span");
      dateSpan.textContent = task.date;
      li.append(dateSpan);

      // Settings
      const settingsDiv = this.createElement("div");
      const buttons = createTabButtons(); // Create a new set of buttons for each task
      buttons.forEach((button) => {
        settingsDiv.append(button.getElement());
      });
      li.append(settingsDiv);

      // Description
      const descriptionDiv = this.createElement("div");
      descriptionDiv.textContent = task.description;
      li.append(descriptionDiv);

      this.tasksList.append(li);
    });
  }

  bindSelectProject(handler) {
    this.projectList.addEventListener("click", (event) => {
      const id = event.target.closest("li").id;
      handler(id);
    });
  }

  bindAddProject(handler) {
    new Form(this.projectForm, handler).handleProjectForm();
  }
  bindAddTask(handler, selectedProjectID) {
    new Form(this.taskForm, handler, selectedProjectID).handleTaskForm();
  }
}
