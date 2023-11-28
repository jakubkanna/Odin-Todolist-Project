import Modal from "./modal.js";
import { FormCopyHandler } from "./forms";

class ContainerHandler {
  constructor(container) {
    this.container = container;
    this.conEventTarget = null;
  }

  listen() {
    this.container.addEventListener("click", (event) => {
      this.conEventTarget = event.target;
      this.handleEvent();
    });
  }

  handleEvent() {
    // To be implemented by subclasses
  }
}

class ULHandler extends ContainerHandler {
  constructor(container, cHandler) {
    super(container);
    this.liClassName = this.getLIClassName();
    this.projectID = null;
    this.cHandler = cHandler;
    this.liHandler;
    this.listen();
  }
  get createLiHandler() {
    return new LiHandler(this.container);
  }
  handleEvent() {
    console.log("Click event handled by ULHandler");
    console.log("Event target:", this.conEventTarget);
    this.selectProject();
  }

  getLIClassName() {
    if (this.container && this.container.firstElementChild) {
      return this.container.firstElementChild.classList[0];
    } else {
      console.error(this.container, "has no children");
      return null;
    }
  }

  selectProject() {
    // console.log(cHandler);
    if (this.conEventTarget) {
      const closestListItem = this.conEventTarget.closest(
        `.${this.liClassName}`
      );
      if (closestListItem) {
        this.projectID = closestListItem.getAttribute("data-project-id");
        if (this.cHandler) this.cHandler(this.projectID);
      }
    }
  }
}
class LiHandler extends ULHandler {
  constructor(container) {
    super(container);
    this.liElement = null;
    this.button = null;
    this.handlers = []; //add new handlers here
  }

  handleEvent() {
    this.liElement = this.conEventTarget.closest(`.${this.liClassName}`);
    this.projectID = this.liElement.getAttribute("data-project-id");
    this.taskID = this.liElement.getAttribute("data-task-id");
    // console.log(this.conEventTarget);
    // Match clicked button class with handler
    const matchedHandler = this.handlers.find((handler) =>
      this.conEventTarget.classList.contains(handler.buttonClass)
    );
    // console.log(matchedHandler, this.handlers, this.conEventTarget.classList);

    // Do action for the matched handler
    if (matchedHandler) {
      matchedHandler.action(this.projectID, this.taskID);
    }
  }

  createDeleteHandler(handler) {
    const deleteHandler = new Delete(handler);
    this.handlers.push(deleteHandler);
  }
  createPriorityHandler(handler) {
    const priorityHandler = new Priority(handler);
    this.handlers.push(priorityHandler);
  }
  createCompleteHandler(handler) {
    const completeHandler = new Complete(handler);
    this.handlers.push(completeHandler);
  }
  createEditHandler(handler, formSelector, modalSelector) {
    const editHandler = new Edit(
      handler,
      formSelector,
      modalSelector,
      this.container
    );
    this.handlers.push(editHandler);
  }
}

class Action {
  constructor(handler) {
    this.handler = handler;
  }
}

class Delete extends Action {
  constructor(handler) {
    super(handler);
    this.buttonClass = "close-btn";
  }

  action(projectID, taskID) {
    this.handler(projectID, taskID);
  }
}

class Priority extends Action {
  constructor(handler) {
    super(handler);
    this.buttonClass = "important-btn";
  }

  action(projectID, taskID) {
    this.handler(projectID, taskID);
  }
}
class Complete extends Action {
  constructor(handler) {
    super(handler);
    this.buttonClass = "check-btn";
  }

  action(projectID, taskID) {
    this.handler(projectID, taskID);
  }
}
class Edit extends Action {
  constructor(handler, formSelector, modalSelector, container) {
    super(handler);
    this.buttonClass = "edit-btn";
    this.formSelector = formSelector;
    this.modalSelector = modalSelector;
    this.container = container;
  }

  action(projectID, taskID) {
    console.log("action for:", this.container);
    // console.log("action:", taskID);
    console.log("action proID:", projectID);
    const modal = new Modal(this.modalSelector);
    modal.show();

    const form = document.querySelector(this.formSelector);
    const formClone = form.cloneNode(true);
    formClone.classList.remove(this.formSelector.substring(1));
    formClone.classList.add("edit-task_" + this.formSelector.substring(1));

    modal.append(formClone);

    const taskForm = new FormCopyHandler(
      formClone,
      this.handler,
      projectID,
      taskID,
      modal
    );
  }
}

export { ULHandler, LiHandler };
