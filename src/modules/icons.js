const icons = (() => {
  //icons
  const octicons = require("@primer/octicons");

  insertIcon(".burger-icon", "three-bars", 48);
  insertIcon(".add", "plus", 16);
  insertIcon(".close", "x", 16);
  insertIcon(".signature", "mark-github", 16);

  function insertIcon(parents, iconName, size) {
    parents = document.body.querySelectorAll(parents);
    for (let element of parents) {
      const icon = document.createElement("i"); // Fix: Use document.createElement instead of document.body.createElement
      icon.innerHTML = octicons[iconName].toSVG({ width: size }); // Fix: Use innerHTML to set the content
      element.appendChild(icon); // Fix: Append the icon to the parent element
    }
  }
})();

export { icons };
