class WindowButtonHandler {
  constructor(button, box) {
    this.button = document.querySelector(button);
    this.box = document.body.querySelector(box);
    this.isVisible = true;
    this.hideWindow(); //hide by default
    this.button.addEventListener("click", () => {
      this.toggleWindow();
    });
  }
  toggleWindow() {
    if (this.isVisible) {
      this.hideWindow();
    } else {
      this.showWindow();
    }
  }
  showWindow() {
    this.box.style.display = "block";
    this.isVisible = true;
  }
  hideWindow() {
    this.box.style.display = "none";
    this.isVisible = false;
  }
}
class ProjectListHandler {
  constructor(ProjectRenderer) {
    this.user = ProjectRenderer.user;
    this.container = ProjectRenderer.list;
    this.projectID = 0;
  }

  handleSelected(renderProjectTasks) {
    this.container.addEventListener("click", (event) => {
      const clickedItem = event.target.closest(".list-projects-item");
      if (clickedItem) {
        const id = clickedItem.getAttribute("project-id");
        if (this.projectID !== id) {
          this.projectID = id;
          renderProjectTasks(this.user, this.projectID);
          this.setActive();
        }
      }
    });
  }

  setActive() {
    const allItems = document.querySelectorAll(".list-projects-item");
    allItems.forEach((item) => {
      item.classList.remove("active");
    });

    const activeItem = document.querySelector(
      `.list-projects-item[project-id="${this.projectID}"]`
    );
    if (activeItem) {
      activeItem.classList.add("active");
    }
  }
}

export { WindowButtonHandler, ProjectListHandler };
