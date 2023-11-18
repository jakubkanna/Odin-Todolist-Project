import { header } from "./modules/components/header";
import { main } from "./modules/components/main";
import { footer } from "./modules/components/footer";

//
const octicons = require("@primer/octicons");

function createHTML() {
  //static
  // Header
  header.brandname.element.innerHTML = "Todolist";
  header.burger.element.innerHTML = octicons["three-bars"].toSVG({ width: 45 });
  // Main
  // Footer
  //dynamic
}

export { createHTML };
