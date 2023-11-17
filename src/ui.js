class Element {
  constructor(tagName, className, parent) {
    this.element = document.createElement(tagName);
    if (className) {
      this.element.className = className;
    }

    if (parent) {
      parent.element.appendChild(this.element);
    } else {
      document.body.appendChild(this.element);
    }
  }
}

function createDOMSkeleton() {
  // Header
  const header = new Element("header", "header");
  header.brandname = new Element("div", "brandname", header);
  header.burger = new Element("div", "burger-icon", header);

  // Main
  const main = new Element("main", "primary");
  main.sidebar = new Element("aside", "sidebar", main);
  main.container = new Element("div", "container", main);
  main.container.div = new Element("div", undefined, main.container);

  // Footer
  const footer = new Element("footer", "colophon");
  footer.div = new Element("div", undefined, footer);
}

export { createDOMSkeleton };
