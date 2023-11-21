class Form {
  constructor(form) {
    this.form = document.body.querySelector(form);
    this.submitter = this.form.querySelector('button[type="submit"]');
  }
}
class FormHandler {
  constructor(form) {
    this.form = form;
    this.data;
  }
  controlRadioButtons() {
    let radioButtons = this.form.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        radioButtons.forEach((element) => {
          if (element === event.target) {
            element.setAttribute("checked", "");
          } else {
            element.removeAttribute("checked");
          }
        });
      });
    });
  }
  controlFormSubmit(user, getProjectID, render) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const projectID = getProjectID();

      this.data = new FormData(this.form, this.form.submitter); //an array of arrays

      if (event.target.className === "form-projects") {
        user.createProject(this.data.get("project_name"));
      } else if (event.target.className === "form-tasks") {
        user.createTask(
          projectID,
          this.data.get("task_name"),
          this.data.get("task_date"),
          this.data.get("task_note"),
          undefined,
          this.data.get("task_priority")
        );
      }
      render(user, projectID);
      this.form.reset();
    });
  }
}

export { Form, FormHandler };
