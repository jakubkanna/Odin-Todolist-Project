// ui.js
import { addEl } from "./elements";

class ProjectRenderer {
  static renderProjects(user) {
    const list = document.querySelector(".list-projects");
    for (let project of user.projects) {
      let item = addEl("li", "list-item", list);
      item.element.innerHTML = `${project.name}`;
      item.element.setAttribute(
        "project-id",
        `${user.projects.indexOf(project)}`
      );
    }
  }
}

class ProjectController {
  static controlProjects(user, renderTabsCallback) {
    const buttons = document.querySelectorAll(".list-item");
    let selectedProject = 0; // default
    buttons.forEach((element) => {
      element.addEventListener("click", (e) => {
        const id = e.target.getAttribute("project-id");
        if (selectedProject !== id) {
          selectedProject = id;
          renderTabsCallback(user, selectedProject);
        }
      });
    });
  }
}

class TabsRenderer {
  static renderTabs(user, projectId) {
    const tasks = user.projects[projectId].tasks;
    const container = document.body.querySelector(".tabs");
    tasks.forEach((element) => {
      const tab = addEl("div", "tab", container);
      tab.element.innerText = "sss";
    });
    // create and insert tabs for the selected project
  }
}

export { ProjectRenderer, ProjectController, TabsRenderer };
