// Base Form class
class Form {
  constructor(formClass, handler, selectedProjectID) {
    this.formClass = formClass;
    this.form = document.querySelector(this.formClass);
    this.handler = handler;
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
class TaskForm extends Form {
  constructor(formClass, handler, selectedProjectID) {
    super(formClass, handler, selectedProjectID);
  }

  handleTaskForm() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = this._input(this.form);

      this.handler(
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
}

// ProjectForm class
class ProjectForm extends Form {
  constructor(formClass, handler, selectedProjectID) {
    super(formClass, handler, selectedProjectID);
  }

  handleProjectForm() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = this._input(this.form);
      const projectName = data.get("project_name");
      this._resetInput(this.form);
      this.handler(projectName);
    });
  }
}

export { TaskForm, ProjectForm };
