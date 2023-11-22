export default function createTab(task, index) {
  const div = document.createElement("div");
  div.classList.add(`task-${index}`);
  appendChildrens(div, task);
  return div;
}

function appendChildrens(element, task) {
  const title = new TabTitle(task.name);
  const date = new TabDate(task.date);
  const settings = new TabSettings();
  const note = new TabNote(task.description);

  element.appendChild(title.element);
  element.appendChild(date.element);
  element.appendChild(settings.element);
  element.appendChild(note.element);
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
  constructor() {
    super("div", "task-settings");
    this.createButtons();
  }
  createButtons() {
    const checkButton = new CheckButton();
    const editButton = new EditButton();
    const closeButton = new CloseButton();

    this.element.appendChild(checkButton.element);
    this.element.appendChild(editButton.element);
    this.element.appendChild(closeButton.element);
  }
}
class TabNote extends TabChildElement {
  constructor(text) {
    super("div", "task-note");
    this.setText(text);
  }
}

class Button {
  constructor(tag, className) {
    this.element = document.createElement(tag);
    this.element.classList.add(className);
    this.element.addEventListener("click", (event) => {
      this.handleClick();
    });
  }
}
class CheckButton extends Button {
  constructor() {
    super("button", ("bi", "bi-check-lg"));
  }
  handleClick() {
    console.log("get task.status");
  }
}
class EditButton extends Button {
  constructor() {
    super("button", ("bi", "bi-pencil"));
  }
}
class CloseButton extends Button {
  constructor() {
    super("button", ("bi", "bi-x-lg"));
  }
}
