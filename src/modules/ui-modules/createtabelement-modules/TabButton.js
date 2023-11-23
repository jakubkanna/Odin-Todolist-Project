export class TabButton {
  constructor(tag, ...classNames) {
    this.element = document.createElement(tag);
    classNames.forEach((className) => this.element.classList.add(className));
  }
}
export class CheckButton extends TabButton {
  constructor(task, tab, controller) {
    super("button", "bi", "bi-check-lg");
    this.task = task;
    this.tab = tab;
    this.controller = controller;
  }

  handleClick() {
    this.controller.toggleTaskStatus(this.task);
    this.updateUI();
  }

  updateUI() {
    if (this.task.status) {
      this.tab.classList.add("important");
      console.log(this.task.status);
    } else {
      this.tab.classList.remove("important");
    }
  }
}

export class EditButton extends TabButton {
  constructor(task, tab, controller) {
    super("button", "bi", "bi-pencil");
  }
  handleClick() {
    //open form
    //insert data from form to current task
    //update tab
  }
}
export class CloseButton extends TabButton {
  constructor(task, tab, controller) {
    super("button", "bi", "bi-x-lg");
    this.task = task;
    this.tab = tab;
    this.controller = controller;
  }
  handleClick() {
    this.controller.removeTask(this.task);
    this.handleUI();
  }
  handleUI() {
    this.tab.remove();
  }
}

const tabBtns = [CheckButton, EditButton, CloseButton];
export { tabBtns };
