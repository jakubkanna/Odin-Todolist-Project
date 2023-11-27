import "./style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Model from "./app_modules/model";
import View from "./app_modules/view";
import Controller from "./app_modules/controller";

document.addEventListener("DOMContentLoaded", () => {
  window.app = new Controller(new Model(), new View());
});

//What can be added?
//burger icon func.
//tasks filter by date
//project title edit button
