import validateParameter from "../validators/validateParam";

export default function createProjectLiEl(project) {
  class ListElement {
    constructor() {
      validateParameter(project, "name", "id");
      this.element = document.createElement("li");
      this.element.classList.add("project-list-item");
      this.element.innerText = project.name;
      this.element.setAttribute("data-project-id", project.id);
    }
    getElement() {
      return this.element;
    }
  }
  const listItem = new ListElement();
  return listItem.getElement();
}
