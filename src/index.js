// main script
import "./style.css";
import { ProjectRenderer, ProjectController, TabsRenderer } from "./modules/ui";
import { createUser } from "./modules/user";

document.addEventListener("DOMContentLoaded", () => {
  const defaultUser = createUser("Default");

  ProjectRenderer.renderProjects(defaultUser);
  ProjectController.controlProjects(defaultUser, TabsRenderer.renderTabs);
});
