import { createTabElement } from "./ui-modules/tab";
class ProjectRenderer {
  constructor(user) {
    this.user = user;
    this.list = this.renderProjects(this.user);
  }
  renderProjects(user) {
    const list = document.querySelector(".list-projects");
    list.innerHTML = "";
    for (let project of user.projects) {
      let id = user.projects.indexOf(project);
      createLIElement(project, list, id);
    }
    return list;
  }
}

function createLIElement(project, parent, id) {
  const item = document.createElement("li");
  item.classList.add("list-projects-item");
  parent.appendChild(item);
  item.innerText = project.name;
  item.setAttribute("project-id", id);
}

function renderProjectTasks(user, projectID) {
  const tasks = user.projects[projectID].tasks;
  const container = document.body.querySelector(".tasks");
  container.innerHTML = ""; // Clear previous tabs

  if (tasks) {
    tasks.forEach((task, index) => {
      let tab = createTabElement(task, index, tasks);
      container.appendChild(tab);
      tab.setAttribute("project-id", `${projectID}`);
    });
  } else {
    container.innerText = "Task loading failed.";
  }
}

export { ProjectRenderer, renderProjectTasks };
