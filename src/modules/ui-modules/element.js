export default class Element {
  constructor(tagName, className, parent, child) {
    this.element = document.createElement(tagName);

    if (className) {
      this.element.className = className;
    }

    if (parent) {
      if (Array.isArray(parent)) {
        // If parent is an array, append the element to each parent in the array
        parent.forEach((p) => {
          p.appendChild(this.element);
        });
      } else {
        parent.appendChild(this.element);
      }
    }

    if (child) {
      if (Array.isArray(child)) {
        // If child is an array, append each child in the array to the element
        child.forEach((c) => {
          this.element.appendChild(c.element || c);
        });
      } else {
        this.element.appendChild(child.element || child);
      }
    }
  }
}
