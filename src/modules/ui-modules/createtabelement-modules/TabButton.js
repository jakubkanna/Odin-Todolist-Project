export class TabButton {
  constructor(tag, ...classNames) {
    this.element = document.createElement(tag);
    classNames.forEach((className) => this.element.classList.add(className));
  }
}
export class CheckButton extends TabButton {
  constructor() {
    super("button", "bi", "bi-check-lg");
  }
}
export class EditButton extends TabButton {
  constructor() {
    super("button", "bi", "bi-pencil");
  }
}
export class CloseButton extends TabButton {
  constructor() {
    super("button", "bi", "bi-x-lg");
  }
}
