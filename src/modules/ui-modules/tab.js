// Handle DOM related stuff for tasks

function createTabElement(task, index) {
  const div = document.createElement("div");
  div.classList.add(`task`);
  div.setAttribute("data-task-id", `${index}`);
  appendChildrens(div, task, index);
  return div;
}

function appendChildrens(element, task, index) {
  const tabs = [
    new TabTitle(task.name),
    new TabDate(task.date),
    new TabSettings(index),
    new TabNote(task.description),
  ];

  tabs.forEach((tab) => {
    element.appendChild(tab.element);
  });
}

class TabChildElement {
  constructor(tag, className) {
    this.element = document.createElement(tag);
    this.element.classList.add(className);
  }

  setText(text) {
    this.element.innerText = text;
  }
}

class TabTitle extends TabChildElement {
  constructor(text) {
    super("h2", "task-name");
    this.setText(text);
  }
}

class TabDate extends TabChildElement {
  constructor(text) {
    super("p", "task-date");
    this.setText(text);
  }
}

class TabSettings extends TabChildElement {
  constructor(index) {
    super("div", "task-settings");
    this.index = index;
    this.createButtons();
  }

  createButtons() {
    const buttons = [
      new CheckButton(),
      new EditButton(),
      new CloseButton(),
      // new ImportantButton(),
    ];

    buttons.forEach((button) => {
      button.element.setAttribute(
        "data-action",
        button.constructor.name.toLowerCase()
      );
      button.element.setAttribute("data-task-id", `${this.index}`);
      this.element.appendChild(button.element);
    });
  }
}

class TabNote extends TabChildElement {
  constructor(text) {
    super("div", "task-note");
    this.setText(text);
  }
}

class TabButton {
  constructor(tag, ...classNames) {
    this.element = document.createElement(tag);
    classNames.forEach((className) => this.element.classList.add(className));
  }
}

class CheckButton extends TabButton {
  constructor() {
    super("button", "bi", "bi-check-lg");
  }
}

class EditButton extends TabButton {
  constructor() {
    super("button", "bi", "bi-pencil");
  }
}

class CloseButton extends TabButton {
  constructor() {
    super("button", "bi", "bi-x-lg");
  }
}
class ImportantButton extends TabButton {
  constructor() {
    super("button", "bi", "bi-exclamation-lg");
  }
}

export { createTabElement };
