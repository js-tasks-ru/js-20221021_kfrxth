export default class NotificationMessage {
  element;
  timeForElement;
  constructor(
    textNotification = "",
    { duration = 1000, type = "success" } = {}
  ) {
    this.textNotification = textNotification;
    this.duration = duration;
    this.seconds = duration / 1000 + "s";
    this.type = type;

    this.show();
  }

  render() {
    const element = document.createElement("div");

    element.innerHTML = this.template();

    if (!document.querySelector(`.notification`)) {
      document.body.append(element);
      this.timeForElement = setTimeout(() => element.remove(), this.duration);
    }

    this.element = element.firstElementChild;
  }

  template() {
    return `
	<div class="notification ${this.type}" style="--value:${this.seconds}">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.textNotification}
      </div>
    </div>
  </div>`;
  }

  show(div) {
    this.render();
    if (div) {
      this.element = div;
    }
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}
