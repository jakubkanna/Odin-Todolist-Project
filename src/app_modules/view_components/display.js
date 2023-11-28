import { createTabBtnSet, createProjectLIBtnSet } from "./buttons";
function cleanDOM(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
//
class Display {
  constructor(taskUL) {
    this.taskUL = taskUL;
  }
  createElement(tag, className, attributeName, attributeValue) {
    const element = document.createElement(tag);
    element.classList.add(className);
    element.setAttribute(attributeName, attributeValue);
    return document.createElement(tag);
  }
  displayInfo(element, project) {
    const div = document.querySelector(element);
    const outerSpan = this.createElement("span");

    const forText = document.createTextNode("for ");

    const innerSpan = this.createElement("span");
    innerSpan.textContent = project.title;

    const projectText = document.createTextNode(" project");

    outerSpan.appendChild(forText);
    outerSpan.appendChild(innerSpan);
    outerSpan.appendChild(projectText);

    cleanDOM(div);
    div.append(outerSpan);
  }
}

class ProjectDisplay extends Display {
  constructor(projectUL, taskUL) {
    super(taskUL);
    this.projectUL = projectUL;
    this.activeProject;
  }

  createLI(projects, activeProjectID, displayTasksCallback) {
    if (activeProjectID !== undefined) {
      this.activeProject = projects.find((item) => item.id === activeProjectID);
    }
    console.log(
      "DISPLAY",
      "actprojid:",
      activeProjectID,
      "actproj:",
      this.activeProject
    );
    projects.forEach((project) => {
      // console.log(project);
      const li = this.createElement("li");
      li.classList.add("list-item");
      //text
      li.setAttribute("data-project-id", project.id);
      const span = this.createElement("span");
      span.textContent = project.title;
      li.append(span);

      //buttons
      const buttons = createProjectLIBtnSet();

      buttons.forEach((button) => {
        li.append(button.getElement());
      });
      //append li element
      this.projectUL.append(li);

      displayTasksCallback(this.activeProject);
    });
  }
  displayProjects(projects, activeProjectID, displayTasksCallback) {
    cleanDOM(this.projectUL);

    if (projects.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Empty";
      this.projectUL.append(p);
    } else {
      this.createLI(projects, activeProjectID, displayTasksCallback);
    }
  }
}

class TaskDisplay extends Display {
  constructor(taskUL) {
    super(taskUL);
  }

  displayTasks(project) {
    this.displayInfo(".info", project);
    cleanDOM(this.taskUL);

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
        if (task.status === true) {
          li.classList.add("complete");
        }
      });
    }
  }
}

export { ProjectDisplay, TaskDisplay, cleanDOM };
