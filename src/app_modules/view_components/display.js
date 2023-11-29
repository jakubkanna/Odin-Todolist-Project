import { createTabBtnSet, createProjectLIBtnSet } from "./buttons";

function cleanDOM(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

class ElementFactory {
  static createElement(
    tag,
    className,
    attributeName,
    attributeValue,
    textContent
  ) {
    const element = document.createElement(tag);

    if (className) {
      element.classList.add(...className.split(" "));
    }

    if (attributeName && attributeValue !== null) {
      element.setAttribute(attributeName, attributeValue);
    }

    if (textContent) {
      element.textContent = textContent;
    }

    return element;
  }
}

class Display {
  constructor(taskUL) {
    this.taskUL = taskUL;
  }

  displayInfo(element, project) {
    const div = document.querySelector(element);
    const forText = "for ";
    const outerSpan = ElementFactory.createElement(
      "span",
      null,
      null,
      null,
      forText
    );

    const innerSpan = ElementFactory.createElement(
      "span",
      null,
      null,
      null,
      project.title
    );

    const projectText = document.createTextNode(" project");

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

    projects.forEach((project) => {
      const li = ElementFactory.createElement(
        "li",
        "list-item",
        "data-project-id",
        project.id
      );

      const span = ElementFactory.createElement("span");
      span.textContent = project.title;
      li.append(span);

      const wrapper = ElementFactory.createElement("div", "wrapper");
      li.append(wrapper);

      const buttons = createProjectLIBtnSet();
      buttons.forEach((button) => {
        wrapper.append(button.getElement());
      });

      this.projectUL.append(li);

      displayTasksCallback(this.activeProject);
    });
  }

  displayProjects(projects, activeProjectID, displayTasksCallback) {
    cleanDOM(this.projectUL);

    if (projects.length === 0) {
      const p = ElementFactory.createElement("p");
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
      const p = ElementFactory.createElement("p");
      p.textContent = "Empty";
      this.taskUL.append(p);
    } else {
      project.tasks.forEach((task) => {
        const li = ElementFactory.createElement("li");
        li.classList.add("tab");
        li.setAttribute("data-project-id", project.id);
        li.setAttribute("data-task-id", task.id);

        const titleSpan = ElementFactory.createElement(
          "span",
          "tab-content-field title"
        );
        titleSpan.textContent = task.title;

        li.append(titleSpan);

        const dateSpan = ElementFactory.createElement(
          "span",
          "tab-content-field date",
          null,
          null,
          task.date
        );

        li.append(dateSpan);

        const settingsDiv = ElementFactory.createElement(
          "div",
          "tab-content-field settings"
        );
        const buttons = createTabBtnSet();
        buttons.forEach((button) => {
          settingsDiv.append(button.getElement());
        });

        li.append(settingsDiv);

        const descriptionDiv = ElementFactory.createElement(
          "span",
          "tab-content-field description"
        );
        descriptionDiv.textContent = task.description;

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
