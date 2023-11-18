import { addEl } from "./elements";

//
function renderProjects(user) {
  //create menu project list buttons
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
//

function controlProjects(user) {
  const buttons = document.querySelectorAll(".list-item");
  let selectedProject = 0; //default
  buttons.forEach((element) => {
    element.addEventListener("click", (e) => {
      const id = e.target.getAttribute("project-id");
      if (selectedProject !== id) {
        selectedProject = id;
        renderTabs(user, selectedProject);
      }
    });
  });
}

//
function renderTabs(user, projectId) {
  const tasks = user.projects[projectId].tasks;
  console.log(tasks);
  const container = document.body.querySelector(".tabs");
  console.log(container);
  tasks.forEach((element) => {
    const tab = addEl("div", "tab", container);
    tab.element.innerText = "sss";
    console.log(tab);
  });
  //create and insert tabs for selected project
}
export { renderProjects, controlProjects, renderTabs };
