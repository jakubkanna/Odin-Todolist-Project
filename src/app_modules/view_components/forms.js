class Form {
  constructor(tag, className, container) {
    this.tag = tag;
    this.className = className;
    this.container = container;
    this.formElement = this.createForm(
      this.tag,
      this.className,
      this.container
    );
  }
  createForm(tag, className, container) {
    return container.append(this.createElement(tag, className));
  }
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  handleRadioButtons() {
    const radioButtons = this.formElement.querySelectorAll(
      'input[type="radio"]'
    );
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
    return new FormData(this.formElement);
  }

  _resetInput() {
    this.formElement.reset();
  }
}

class ProjectForm extends Form {
  constructor(tag, className, container) {
    super(tag, className, container);
  }

  handleProjectForm() {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = this._input(this.formElement);
      const projectName = data.get("project_name");
      this._resetInput(this.formElement);
      this.handler(projectName);
    });
  }
}

class TaskForm extends Form {
  constructor(tag, className, container) {
    super(tag, className, container);
  }

  handleTaskForm() {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = this._input();

      this.handler(
        this.selectedProjectID,
        data.get("task_name"),
        data.get("task_date"),
        data.get("task_note"),
        false,
        data.get("task_priority")
      );
      this._resetInput();
    });
  }

  generateTaskForm() {
    const taskFormConfig = {
      fields: [
        {
          type: "text",
          name: "task_name",
          placeholder: "Task Name",
          id: "task-name",
        },
        {
          type: "date",
          name: "task_date",
          placeholder: "Task Date",
          id: "task-date",
        },
        {
          type: "text",
          name: "task_note",
          placeholder: "Task Note",
          id: "task-note",
        },
        {
          type: "radio",
          labelText: "Is this important?",
          value: "yes",
          checked: false,
        },
        { type: "radio", labelText: "", value: "no", checked: true },
      ],
      container: document.querySelector("form.form-tasks"),
    };
    console.log(this.container);
    const taskForm = new FormElementsGen(taskFormConfig);
  }
}

class FormElementsGen {
  constructor(config) {
    this.addFormToDocument(config.container);
    this.createFormElements(config.fields);
  }
  createFormElements(fields) {
    fields.forEach((field) => {
      switch (field.type) {
        case "text":
        case "date":
          this.createTextInput(field);
          break;
        case "radio":
          this.createRadioInput(field);
          break;
        default:
          throw new Error(`Unsupported field type: ${field.type}`);
      }
    });

    this.createSubmitButton();
  }

  createTextInput({ name, placeholder, id }) {
    const input = document.createElement("input");
    input.type = "text";
    input.name = name;
    input.id = id;
    input.placeholder = placeholder;
    this.addToContainer(input);
  }

  createRadioInput({ labelText, value, checked }) {
    const label = document.createElement("label");
    label.htmlFor = `${value}-${this.formClassName}`;
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "priority";
    input.id = `${value}-${this.formClassName}`;
    input.value = value;
    input.checked = checked;

    const questionDiv = document.createElement("div");
    questionDiv.className = "form-question";

    questionDiv.appendChild(label);
    questionDiv.appendChild(input);
    this.addToContainer(questionDiv);
  }

  createSubmitButton() {
    const submitDiv = document.createElement("div");
    submitDiv.className = "submit";

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "OK";

    submitDiv.appendChild(button);
    this.addToContainer(submitDiv);
  }

  addToContainer(element) {
    if (this.container) {
      this.container.appendChild(element);
    }
  }

  addFormToDocument(container) {
    this.container = container;
  }
}

export { TaskForm, ProjectForm };
