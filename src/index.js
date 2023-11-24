import "./style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Model from "./app_modules/model";
import View from "./app_modules/view";
import Controller from "./app_modules/controller";

window.app = new Controller(new Model(), new View());
