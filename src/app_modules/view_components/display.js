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
    element.classList.add(className);
    if (attributeName) {
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
    const outerSpan = ElementFactory.createElement(
      "span",
      null,
      null,
      null,
      null
    );

    outerSpan.appendChild(
      ElementFactory.createElement("span", null, null, null, "for ")
    );
    outerSpan.appendChild(
      ElementFactory.createElement("span", null, null, null, project.title)
    );
    outerSpan.appendChild(
      ElementFactory.createElement("span", null, null, null, " project")
    );

    cleanDOM(div);
    div.appendChild(outerSpan);
  }
}

class ProjectDisplay extends Display {
  constructor(projectUL, taskUL) {
    super(taskUL);
    this.projectUL = projectUL;
    this.activeProject;
  }

  createLI(project) {
    const li = ElementFactory.createElement(
      "li",
      "list-item",
      "data-project-id",
      project.id,
      null
    );

    // Text
    li.appendChild(
      ElementFactory.createElement("span", null, null, null, project.title)
    );

    // Buttons
    const buttons = createProjectLIBtnSet();
    buttons.forEach((button) => li.appendChild(button.getElement()));

    // Append li element
    this.projectUL.appendChild(li);

    return li;
  }

  displayProjects(projects, activeProjectID, displayTasksCallback) {
    cleanDOM(this.projectUL);

    if (projects.length === 0) {
      this.projectUL.appendChild(
        ElementFactory.createElement("p", null, null, null, "Empty")
      );
    } else {
      projects.forEach((project) => {
        const li = this.createLI(project);
        displayTasksCallback(project);
      });
    }
  }
}

class TaskDisplay extends Display {
  constructor(taskUL) {
    super(taskUL);
  }

  createTaskElement(tag, className, project, task, isPriority, isComplete) {
    const element = ElementFactory.createElement(
      tag,
      className,
      "data-project-id",
      project.id,
      null
    );

    const titleSpan = ElementFactory.createElement(
      "span",
      "tab-content-field",
      null,
      null,
      task.title
    );
    element.appendChild(titleSpan);

    const dateSpan = ElementFactory.createElement(
      "span",
      "tab-content-field date-field",
      null,
      null,
      task.date
    );
    element.appendChild(dateSpan);

    const settingsDiv = ElementFactory.createElement(
      "div",
      "tab-content-field",
      null,
      null,
      null
    );
    const buttons = createTabBtnSet();
    buttons.forEach((button) => settingsDiv.appendChild(button.getElement()));
    element.appendChild(settingsDiv);

    const descriptionDiv = ElementFactory.createElement(
      "span",
      "tab-content-field",
      null,
      null,
      task.description
    );
    element.appendChild(descriptionDiv);

    this.taskUL.appendChild(element);

    if (isPriority) {
      element.classList.add("important");
    }
    if (isComplete) {
      element.classList.add("complete");
    }
  }

  displayTasks(project) {
    this.displayInfo(".info", project);
    cleanDOM(this.taskUL);

    if (project.tasks.length === 0) {
      this.taskUL.appendChild(
        ElementFactory.createElement("p", null, null, null, "Empty")
      );
    } else {
      project.tasks.forEach((task) => {
        this.createTaskElement(
          "li",
          "tab",
          project,
          task,
          task.priority === "yes",
          task.status
        );
      });
    }
  }
}

export { ProjectDisplay, TaskDisplay, cleanDOM };
