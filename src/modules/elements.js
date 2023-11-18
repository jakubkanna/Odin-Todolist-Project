class Element {
  constructor(tagName, className, parent) {
    this.element = document.createElement(tagName);
    if (className) {
      this.element.className = className;
    }

    if (parent) {
      parent.appendChild(this.element);
    } else {
      document.body.appendChild(this.element);
    }
  }
}

//

function addEl(tagName, className, parent) {
  return new Element(tagName, className, parent);
}
export { addEl };
