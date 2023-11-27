import { cleanDOM } from "./display";
export default class Modal {
  constructor(element) {
    this.element = document.querySelector(element);
  }

  hide() {
    this.element.style.display = "none";
    this.element.classList.remove("active");
  }
  show() {
    cleanDOM(this.element);
    if (!this.element.classList.contains("active")) {
      this.element.style.display = "block";
      this.element.classList.add("active");
    }
  }
  append(child) {
    this.element.append(child);
  }
}
