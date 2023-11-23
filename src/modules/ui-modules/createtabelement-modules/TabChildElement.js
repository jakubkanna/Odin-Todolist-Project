import { createTabButtons } from "../createTabElement";

class TabChildElement {
  constructor(tag, className) {
    this.element = document.createElement(tag);
    this.element.classList.add(className);
  }
  setText(text) {
    this.element.innerText = text;
  }
}
export class TabSettings extends TabChildElement {
  constructor() {
    super("div", "task-settings");
  }
  appendButtons(buttons, id) {
    buttons.forEach((btn) => {
      btn.element.setAttribute(
        "data-action",
        btn.constructor.name.toLowerCase()
      );
      btn.element.setAttribute("data-task-id", `${id}`);
      this.element.appendChild(btn.element);
      btn.element.addEventListener("click", (event) => {
        btn.handleClick();
      });
    });
  }
}
export class TabTitle extends TabChildElement {
  constructor(text) {
    super("h2", "task-name");
    this.setText(text);
  }
}
export class TabDate extends TabChildElement {
  constructor(text) {
    super("p", "task-date");
    this.setText(text);
  }
}
export class TabNote extends TabChildElement {
  constructor(text) {
    super("div", "task-note");
    this.setText(text);
  }
}
