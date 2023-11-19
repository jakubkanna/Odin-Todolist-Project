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
  renderTabs(id) {
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

class ProjectController {
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
          console.log(e.target);
          this.projectRenderer.renderTabs(id); // Render tabs when a project is clicked
        }
      });
    });
  }
}

function createUI(user) {
  const projectRenderer = new ProjectRenderer(user);
  const projectController = new ProjectController(projectRenderer);

  projectRenderer.renderProjects();
  projectController.controlProjects();
}

export default createUI;