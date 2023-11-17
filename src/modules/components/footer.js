import { addEl } from "../elements";

const footer = addEl("footer", "colophon");
footer.div = addEl("div", undefined, footer);

console.log("footer created");

export { footer };
