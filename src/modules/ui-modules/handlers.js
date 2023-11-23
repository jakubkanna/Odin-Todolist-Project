class ExpandWinBtnHandler {
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
export { ExpandWinBtnHandler };
