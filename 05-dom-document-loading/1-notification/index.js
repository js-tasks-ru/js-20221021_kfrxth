export default class NotificationMessage {
	element;

  constructor(textNotification = "", { duration = 1000, type = "success" }) {
	this.textNotification = textNotification;
    this.duration = duration;
    this.type = type;
    this.render();
  }

  render() {}

  destroy() {
	this.remove();
    this.element = null;
  }

  remove() {
	this.element.remove();
  }
}
