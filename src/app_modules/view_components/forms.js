// Base Form class
class Form {
  constructor(form, cHandler, selectedProjectID) {
    this.form = form;
    this.cHandler = cHandler;
    this.selectedProjectID = selectedProjectID;
    this.init();
  }

  init() {
    this.handleRadioButtons();
  }

  handleRadioButtons() {
    const radioButtons = this.form.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        this.handleRadioButtonClick(event, radioButtons);
      });
    });
  }

  handleRadioButtonClick(event, radioButtons) {
    radioButtons.forEach((element) => {
      if (element === event.target) {
        element.setAttribute("checked", "");
      } else {
        element.removeAttribute("checked");
      }
    });
  }

  _input() {
    return new FormData(this.form);
  }

  _resetInput() {
    this.form.reset();
  }
}

// TaskForm class
class TaskFormHandler extends Form {
  constructor(form, cHandler, selectedProjectID) {
    super(form, cHandler, selectedProjectID);
    this.handleTaskForm();
  }

  handleTaskForm() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = this._input(this.form);
      // console.log(this.selectedProjectID);
      this.cHandler(
        this.selectedProjectID,
        data.get("task_name"),
        data.get("task_date"),
        data.get("task_note"),
        false,
        data.get("task_priority")
      );

      this._resetInput(this.form);
    });
  }
  remove(bool) {
    if (bool) {
      this.form.remove();
    }
  }
}

// ProjectForm class
class ProjectFormHandler extends Form {
  constructor(form, cHandler, selectedProjectID) {
    super(form, cHandler, selectedProjectID);
    this.handleProjectForm();
  }

  handleProjectForm() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = this._input(this.form);
      const projectName = data.get("project_name");
      this._resetInput(this.form);
      this.cHandler(projectName);
    });
  }
}

export { TaskFormHandler, ProjectFormHandler };
