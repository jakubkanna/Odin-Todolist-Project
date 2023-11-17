//ui

// create header, main, footer object
class Element {
  constructor(tag, selector) {
    this.tag = tag;
    this.selector = selector;
    this.documentNode;
  }

  create() {
    this.documentNode = document.createElement(this.tag);
    if (this.selector !== null) {
      this.documentNode.className = this.selector;
    }
    return this;
  }

  appendTo(querySelector) {
    querySelector.appendChild(this.documentNode);
    return this; // Return the instance for chaining
  }
}

class ChildElement extends Element {
  constructor(tag, selector, parentSelector) {
    super(tag, selector);
    this.parentSelector = parentSelector;
  }

  appendToParent() {
    const parentElement = document.querySelector(this.parentSelector);
    if (parentElement) {
      console.log("Parent Element Found:", parentElement);
      return this.appendTo(parentElement);
    } else {
      console.error("Parent Element Not Found");
      return this;
    }
  }
}

function createHTMLSkeleton() {
  const header = new Element("header", null).appendTo(document.body);
  const main = new Element("main", null).appendTo(document.body);
  const footer = new Element("footer", null).appendTo(document.body);

  const brandname = new ChildElement(
    "div",
    "brandname",
    "header"
  ).appendToParent();
  const burger = new ChildElement(
    "div",
    "burger-icon",
    "header"
  ).appendToParent();
}

// a. extend header = brandname + burger icon
// b. extend main =  sidebar + container
// c. extend footer = div
// etc.

// create insert function which will insert object into another

export { createHTMLSkeleton };
