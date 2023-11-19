import { addEl } from "./elements";

class ProjectRenderer {
  constructor(user) {
    this.user = user;
  }
  renderProjects() {
    const list = document.querySelector(".list-projects");
    for (let project of this.user.projects) {
      let item = addEl("li", "list-projects-item", list);
      item.element.innerHTML = `${project.name}`;
      let id = this.user.projects.indexOf(project);
      item.element.setAttribute("project-id", id);
    }
  }
  renderProjectTasks(id) {
    const projectId = id;
    const tasks = this.user.projects[projectId].tasks;
    const container = document.body.querySelector(".tabs");
    container.innerHTML = ""; // Clear previous tabs
    tasks.forEach((element) => {
      const tab = addEl("div", "tab", container);
      tab.element.innerText = "Tab";
    });
  }
}

class ProjectListHandler {
  constructor(projectRenderer) {
    this.projectRenderer = projectRenderer;
    this.selectedProject = 0;
  }
  controlProjects() {
    const buttons = document.querySelectorAll(".list-projects-item");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("project-id");
        if (this.selectedProject !== id) {
          this.selectedProject = id;
          this.projectRenderer.renderProjectTasks(id); // Render tabs when a project is clicked
        }
      });
    });
  }
}

//

class WindowButtonHandler {
  constructor(button, box) {
    this.button = document.querySelector(button);
    this.box = document.body.querySelector(box);
    this.isVisible = true;
    this.button.addEventListener("click", () => {
      this.toggleForm();
    });
  }
  toggleForm() {
    if (this.isVisible) {
      this.hideForm();
    } else {
      this.showForm();
    }
  }
  showForm() {
    this.box.style.display = "block";
    this.isVisible = true;
  }
  hideForm() {
    this.box.style.display = "none";
    this.isVisible = false;
  }
}

// filter tasks by date

//

class Form {
  constructor(form) {
    this.form = form;
  }
}

class FormDataGetter extends Form {
  constructor(form) {
    super(form);
    this.data;
  }
  getData() {
    // Implement logic to get form data
  }
}

class FormDataProcessor {
  constructor(user, data) {
    this.user = user;
    this.data = data;
  }
  createNewProject() {
    // Implement project creation logic using this.user.createProject()
  }

  createNewTask() {
    // Implement task creation logic using this.user.createTask()
  }
}

class FormSubmitHandler extends Form {
  constructor(renderer, form, submitButton) {
    super(form);
    // Constructor logic
  }

  renderNewProject() {
    // Implement logic to render new project
  }

  renderNewTask() {
    // Implement logic to render new task
  }
}

//settings
//set status
//set priority
//edit data
//remove project/task
class ProjectSettings {
  constructor(project) {
    this.form = form;
  }
}

function createUI(user) {
  //
  const projectRenderer = new ProjectRenderer(user);
  projectRenderer.renderProjects();

  const projectListHandler = new ProjectListHandler(projectRenderer);
  projectListHandler.controlProjects();
  //
  const projectWindowHandler = new WindowButtonHandler(
    ".new-project-button",
    ".new-project-box"
  );
  const taskWindowHandler = new WindowButtonHandler(
    ".new-task-button",
    ".new-task-box"
  );
  //call filter

  //call form

  //call settigns
}

export default createUI;
