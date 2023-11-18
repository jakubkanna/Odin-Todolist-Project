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
          console.log(e.target);
          this.projectRenderer.renderProjectTasks(id); // Render tabs when a project is clicked
        }
      });
    });
  }
}

class ProjectCreator {
  constructor(user) {
    super(user);
  }

  showProjectForm() {
    // Implementation for showing project form
  }

  showTaskForm() {
    // Implementation for showing task form
  }

  createProject(formData) {
    // Implementation for creating a project
  }

  createTask(formData) {
    // Implementation for creating a task
  }
}

class ProjectEditor {
  // Implementation for editing project details
}
class ProjectReducer {
  // Implementation for removing projects and tasks
}

function createUI(user) {
  const projectRenderer = new ProjectRenderer(user);
  const ProjectListHandler = new ProjectController(projectRenderer);

  projectRenderer.renderProjects();
  projectController.controlProjects();
}

export default createUI;
