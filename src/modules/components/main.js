import { addEl } from "../elements";

// Main
const main = addEl("main", "primary");
// Main-Sidebar
main.sidebar = addEl("aside", "sidebar", main);
main.sidebar.menu = addEl("div", "menu", main.sidebar);
main.sidebar.menu.div = addEl("div", undefined, main.sidebar.menu);
main.sidebar.menu.div.h1 = addEl("h1", "title", main.sidebar.menu.div);
// Main-Sidebar-Newproject
main.sidebar.newproject = addEl("div", "new-project-window", main.sidebar);
main.sidebar.newproject.button = addEl(
  "button",
  "new-project-button",
  main.sidebar.newproject
);
main.sidebar.newproject.div = addEl("div", undefined, main.sidebar.newproject);
main.sidebar.newproject.div.form;
// Main-Container
main.container = addEl("div", "container", main);
main.container.box = addEl("div", "box", main.container);
main.container.dropdown = addEl("div", "dropdown", main.container.box);
main.container.header = addEl("div", "title", main.container.box);
console.log("main created");

export { main };
