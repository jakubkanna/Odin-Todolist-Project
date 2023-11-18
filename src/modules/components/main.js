import { addEl } from "../elements";

const main = addEl("main", "primary");

main.sidebar = {
  element: addEl("aside", "sidebar", main),
  menu: {
    element: addEl("div", "menu", main.sidebar),
    div: {
      element: addEl("div", undefined, main.sidebar.menu),
      h1: addEl("h1", "title", main.sidebar.menu.div),
    },
  },
  newproject: {
    element: addEl("div", "new-project-window", main.sidebar),
    button: addEl("button", "new-project-button", main.sidebar.newproject),
    div: {
      element: addEl("div", undefined, main.sidebar.newproject),
      form: /* Add your form creation here */,
    },
  },
};

main.container = {
  element: addEl("div", "container", main),
  box: {
    element: addEl("div", "box", main.container),
    dropdown: addEl("div", "dropdown", main.container.box),
    header: addEl("div", "title", main.container.box),
  },
};

console.log("main created");
export { main };
