import {
  createTabBtnSet,
  ToggleVisibilityBtn,
} from "./view_components/buttons";
import { TaskFormHandler, ProjectFormHandler } from "./view_components/forms";

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

    new TaskManager(this.taskUL, cHandler, "important-btn");
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
  }
  performToggleAction() {
    this.container.addEventListener("click", (e) => {
      if (e.target.classList.contains(this.buttonClass)) {
        new TaskActionHandler(e, this.buttonClass).toggle(this.handler); //error undefined tasks
      }
    });
  }
}

// class TaskActionHandler {
//   constructor(e, buttonClass) {
//     this.taskTab = e.target.parentElement.parentElement;
//     // console.log(this.taskTab);
//     this.buttonClass = buttonClass;

//     this.projectId = parseInt(this.taskTab.getAttribute("data-project-id"));
//     // console.log(this.projectId);
//     this.taskId = parseInt(this.taskTab.getAttribute("data-task-id"));
//     // console.log(this.taskId);
//   }

//   toggle(handler) {
//     // console.log(handler);
//     if (this.taskTab) {
//       if (handler) {
//         this.taskTab.classList.toggle("important");
//         handler(this.projectId, this.taskId);
//       }
//     }
//     return;
//   }

//   remove(handler) {
//     if (this.taskTab) {
//       if (handler) {
//         this.taskTab.remove();
//         handler(this.projectId, this.taskId);
//       }
//     }
//     return;
//   }
// }

// class TaskManager extends ProjectBase {
//   constructor(container, handler, buttonClass) {
//     super(container, handler);
//     this.buttonClass = buttonClass;

//     this.projectId = null;
//     this.taskId = null;
//   }

//   performDeleteAction() {
//     this.container.addEventListener("click", (e) => {
//       if (e.target.classList.contains(this.buttonClass)) {
//         new TaskActionHandler(e, this.buttonClass).remove(this.handler); //error undefined tasks
//       }
//     });
//   }

//   performToggleAction() {
//     this.container.addEventListener("click", (e) => {
//       if (e.target.classList.contains(this.buttonClass)) {
//         new TaskActionHandler(e, this.buttonClass).toggle(this.handler); //error undefined tasks
//       }
//     });
//   }
// }

// class TaskActionHandler {
//   constructor(e, buttonClass) {
//     this.taskTab = e.target.parentElement.parentElement;
//     // console.log(this.taskTab);
//     this.buttonClass = buttonClass;

//     this.projectId = parseInt(this.taskTab.getAttribute("data-project-id"));
//     // console.log(this.projectId);
//     this.taskId = parseInt(this.taskTab.getAttribute("data-task-id"));
//     // console.log(this.taskId);
//   }

//   toggle(handler) {
//     // console.log(handler);
//     if (this.taskTab) {
//       if (handler) {
//         this.taskTab.classList.toggle("important");
//         handler(this.projectId, this.taskId);
//       }
//     }
//     return;
//   }

//   remove(handler) {
//     if (this.taskTab) {
//       if (handler) {
//         this.taskTab.remove();
//         handler(this.projectId, this.taskId);
//       }
//     }
//     return;
//   }
// }
