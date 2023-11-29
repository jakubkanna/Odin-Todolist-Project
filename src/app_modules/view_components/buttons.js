class TabButton {
  constructor(tag, ...classNames) {
    this.element = document.createElement(tag);
    classNames.forEach((className) => this.element.classList.add(className));
  }
  getElement() {
    return this.element;
  }
}
class CheckButton extends TabButton {
  constructor() {
    super("button", "check-btn", "bi", "bi-check-lg");
  }
}

class EditButton extends TabButton {
  constructor() {
    super("button", "edit-btn", "bi", "bi-pencil");
  }
}
class CloseButton extends TabButton {
  constructor() {
    super("button", "close-btn", "bi", "bi-x-lg");
  }
}
class ExclamationButton extends TabButton {
  constructor() {
    super("button", "important-btn", "bi", "bi-exclamation-lg");
  }
}
function createTabBtnSet() {
  return [
    new ExclamationButton(),
    new CheckButton(),
    new EditButton(),
    new CloseButton(),
  ];
}
function createProjectLIBtnSet() {
  return [new EditButton(), new CloseButton()];
}
class ToggleVisibilityBtn {
  constructor(button, box) {
    this.button = document.querySelector(button);
    this.box = document.body.querySelector(box);
    this.button.addEventListener("click", () => {
      this.toggleWindow();
    });
  }

  toggleWindow() {
    if (this.box.classList.contains("hidden")) {
      this.showWindow();
    } else {
      this.hideWindow();
    }
  }

  showWindow() {
    this.box.style.display = "flex";
    this.box.classList.remove("hidden");
    this.box.classList.add("shown");
  }

  hideWindow() {
    this.box.style.display = "none";
    this.box.classList.remove("shown");
    this.box.classList.add("hidden");
  }
}

class PlusToggleBtn extends ToggleVisibilityBtn {
  constructor(button, box) {
    super(button, box);
    this.hideWindow();
  }

  showWindow() {
    const windowElement = this.button.closest("[class*='-window']");
    windowElement.style.background = "var(--light-purple)";

    super.showWindow();
  }

  hideWindow() {
    const windowElement = this.button.closest("[class*='-window']");
    windowElement.style.background = "";

    super.hideWindow();
  }
}

export {
  createTabBtnSet,
  createProjectLIBtnSet,
  ToggleVisibilityBtn,
  PlusToggleBtn,
};
