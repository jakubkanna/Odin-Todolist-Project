class Form {
  constructor(form, handler, selectedProjectID) {
    this.form = form;
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
  handleProjectForm() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = this._input(this.form);
      const projectName = data.get("project_name");
      this._resetInput(this.form);
      this.handler(projectName);
    });
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
  _input(form) {
    return new FormData(form);
  }

  _resetInput(form) {
    form.reset();
  }
}
export default Form;
