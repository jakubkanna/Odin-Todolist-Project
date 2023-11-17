class Element {
  static elements = [];

  constructor(tag, className = null, parent = null) {
    this.tag = tag;
    this.className = className;
    this.parent = parent;
    Element.elements.push(this);
  }
}

function createElements() {
  //header
  const header = new Element("header", "header");
  header.brandname = new Element("div", "brandname", header);
  header.burger = new Element("div", "burger-icon", header);
  //main
  const main = new Element("main", "primary");
  main.sidebar = new Element("aside", "sidebar", main);
  main.container = new Element("div", "container", main);
  main.container.div = new Element("div", undefined, main.container);
  //footer
  const footer = new Element("footer", "colophon");
  footer.div = new Element("div", undefined, footer);
}

function createDOMSkeleton() {
  createElements();

  let bodyElements = [];

  for (let element of Element.elements) {
    // Convert element to document node
    let domNode = document.createElement(element.tag);
    if (element.className) {
      domNode.classList.add(element.className);
    }

    // If the element doesn't have a parent, insert into document.body
    if (!element.parent) {
      document.body.appendChild(domNode);
      bodyElements.push(domNode);
    } else {
      // If the element has a parent, insert into its parent
      let parentClassName = element.parent.className;

      for (let bodyElement of bodyElements) {
        if (bodyElement.classList.contains(parentClassName)) {
          bodyElement.appendChild(domNode);
        }
      }
    }
  }
}

export { createDOMSkeleton };
