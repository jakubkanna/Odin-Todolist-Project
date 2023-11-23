import {
  CheckButton,
  EditButton,
  CloseButton,
} from "./createtabelement-modules/TabButton";
import {
  TabTitle,
  TabDate,
  TabSettings,
  TabNote,
} from "./createtabelement-modules/TabChildElement";
import validateParameter from "../validators/validateParam";

export default function createTaskTabElement(task, controller) {
  class TaskTabElement {
    constructor() {
      validateParameter(task, "id", "projectID");
      this.task = task;
      this.id = task.id;
      this.projectID = task.projectID;
      this.element = document.createElement("div");
      this.element.classList.add("task");
      this.element.setAttribute("data-task-id", this.id);
      this.element.setAttribute("data-project-id", this.projectID);
      this.appendChildrens();
    }
    getElement() {
      return this.element;
    }
    appendChildrens() {
      const tabSettings = new TabSettings();
      const buttons = [
        new CheckButton(task, this.element, controller),
        new EditButton(task, this.element, controller),
        new CloseButton(task, this.element, controller),
      ];
      tabSettings.appendButtons(buttons, this.id);

      const tabChildElements = [
        new TabTitle(task.name),
        new TabDate(task.date),
        tabSettings,
        new TabNote(task.description),
      ];

      tabChildElements.forEach((tab) => {
        this.element.appendChild(tab.element);
      });
    }
  }
  const tab = new TaskTabElement();
  return tab.getElement();
}
