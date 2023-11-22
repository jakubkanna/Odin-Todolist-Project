import { ExpandWinBtnHandler, ProjectListHandler } from "./ui-modules/buttons";
import { Form, FormHandler } from "./ui-modules/forms";
import { ProjectRenderer, renderProjectTasks } from "./renderers";

function createButtonHandlers() {
  return [
    new CheckButtonHandler("checkbutton"),
    new EditButtonHandler("editbutton"),
    new CloseButtonHandler("closebutton"),
  ];
}

function handleTaskButtons(user, className) {
  const buttonHandlers = createButtonHandlers();
  const buttons = document.querySelectorAll(`${className} .task button`);

  buttons.forEach((element) => {
    element.addEventListener("click", (event) => {
      const taskElement = event.target.closest(".task");

      let projectID = taskElement.getAttribute("project-id");

      let tasks = user.projects[projectID].tasks;
      const taskID = taskElement.getAttribute("data-task-id");
      const task = tasks[taskID];

      const buttonType = event.target.getAttribute("data-action");
      const handler = buttonHandlers.find((h) => h.type === buttonType);

      if (handler) {
        handler.handleClick(task, taskElement);
      } else {
        console.log("No handler found for the button type:", buttonType);
      }
    });
  });
}
class ButtonHandler {
  constructor(type) {
    this.type = type;
  }
}
class CheckButtonHandler extends ButtonHandler {
  handleClick(task, taskElement) {
    console.log(task);
    task.status = !task.status;
    if (task.status) {
      taskElement.classList.add("important");
    } else {
      taskElement.classList.remove("important");
    }
  }
}
class EditButtonHandler extends ButtonHandler {
  handleClick() {
    console.log("Edit button clicked");
  }
}

class CloseButtonHandler extends ButtonHandler {
  handleClick() {
    console.log("Close button clicked");
  }
}

function createUI(user) {
  const renderer = new ProjectRenderer(user);
  const projectListHandler = new ProjectListHandler(renderer);

  const getProjectID = () => projectListHandler.projectID;

  projectListHandler.setActive();

  renderProjectTasks(user, getProjectID()); //default (id:0)

  projectListHandler.handleListItemClick(renderProjectTasks);

  //handle "create new" buttons

  new ExpandWinBtnHandler(".new-project-button", ".new-projects-box");
  new ExpandWinBtnHandler(".new-task-button", ".new-task-box");

  // declare form

  const taskForm = new Form(".new-tasks-window form");
  const projectForm = new Form(".new-projects-window form");

  //control forms

  const taskFormHandler = new FormHandler(taskForm.form);
  taskFormHandler.controlRadioButtons();
  taskFormHandler.controlFormSubmit(user, getProjectID, renderProjectTasks);

  const projectFormHandler = new FormHandler(projectForm.form);
  projectFormHandler.controlFormSubmit(
    user,
    getProjectID,
    renderer.renderProjects
  );

  //
  handleTaskButtons(user, ".tasks");
}

export default createUI;
