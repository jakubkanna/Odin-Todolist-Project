import { addEl } from "../elements";

const header = addEl("header", "header");
header.brandname = addEl("div", "brandname", header);
header.burger = addEl("div", "burger-icon", header);

console.log("header created");

export { header };
