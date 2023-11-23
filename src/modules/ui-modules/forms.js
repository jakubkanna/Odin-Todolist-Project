export default class Form {
  constructor(container, controller, renderer) {
    this.form = document.body.querySelector(`${container} form`);
    this.controller = controller;
    this.renderer = renderer;
    this.submitter = this.form.querySelector('button[type="submit"]');
    this.data;
    this.setupForm();
  }

  setupForm() {
    this.controlRadioButtons();
    this.controlFormSubmit();
  }

  controlRadioButtons() {
    const radioButtons = this.form.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        this.handleRadioButtonClick(event, radioButtons);
      });
    });
  }

  controlFormSubmit() {
    this.form.addEventListener("submit", (event) => {
      this.handleFormSubmit(event);
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

  handleFormSubmit(event) {
    event.preventDefault();
    const project = this.controller.getCurrentProject();
    const projectID = project.id;

    this.data = new FormData(this.form, this.submitter);

    if (event.target.className === "form-projects") {
      this.controller.createProject(this.data.get("project_name"));
    } else if (event.target.className === "form-tasks") {
      this.controller.createTask(
        projectID,
        this.data.get("task_name"),
        this.data.get("task_date"),
        this.data.get("task_note"),
        undefined,
        this.data.get("task_priority")
      );
    }
    this.renderer();
    this.form.reset();
  }
}
