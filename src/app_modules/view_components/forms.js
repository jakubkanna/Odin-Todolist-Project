// Base Form class
class Form {
  constructor(form, cHandler, projectID) {
    this.form = form;
    this.cHandler = cHandler;
    this.projectID = projectID;
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
  constructor(form, cHandler) {
    super(form, cHandler);
    this.handleTaskForm();
  }

  handleTaskForm() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = this._input(this.form);
      this.cHandler(
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

class ExtendedTaskFormHandler extends Form {
  constructor(form, cHandler, projectID, taskID, modal) {
    console.log("form taskid:", taskID);
    super(form, cHandler, projectID);
    this.taskID = taskID;
    this.modal = modal;
    this.handleExtendedTaskForm();
  }

  handleExtendedTaskForm() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      // console.log(this.taskID);

      // Disable the submit button to prevent multiple submissions
      const submitButton = this.form.querySelector('button[type="submit"]');
      submitButton.disabled = true;

      const formData = this._serializeForm(this.form);
      // console.log("form data:", formData);
      // console.log("form chandl", this.cHandler);
      this.cHandler(this.projectID, formData, this.taskID);
      this._resetInput(this.form);
      this.modal.hide();
      this.form.remove();
    });
  }

  _serializeForm(form) {
    const formData = new FormData(form);
    const serializedData = [];

    // Iterate over form data entries
    formData.forEach((value, key) => {
      serializedData.push(value);
    });

    return [...serializedData]; // Convert to an array
  }
}

// ProjectForm class
class ProjectFormHandler extends Form {
  constructor(form, cHandler, projectID) {
    super(form, cHandler, projectID);
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

export { TaskFormHandler, ProjectFormHandler, ExtendedTaskFormHandler };
