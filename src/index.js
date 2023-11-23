import "./style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import User from "./modules/user";
import Controller from "./modules/controller";
import UI from "./modules/ui";

function createUser(name) {
  const user = new User(`${name}`);

  user.createProject("Default");
  user.createProject("Default2");

  user.createTask(0, "Example Task", "01/01/2001", "Description", false, "no");
  user.createTask(0, "Example Tas2", "01/01/2001", "Description", false, "no");
  user.createTask(1, "Example Task3", "01/01/2001", "Description", false, "no");

  return user;
}

document.addEventListener("DOMContentLoaded", () => {
  window.defaultUser = createUser("Noname");

  const controller = new Controller(defaultUser, new UI());

  controller.ui.controller = controller;

  controller.init();
});
