class Tooltip {
  static instance;

  onPointerOver = (event) => {
    const element = event.target.closest("[data-tooltip]");

    if (element) {
      this.render(element.dataset.tooltip);
      document.addEventListener("pointermove", this.onPointerMove);
    }
  };

  onPointerMove = (event) => {
    this.moveTooltip(event);
  };

  onPointerOut = () => {
    this.remove();
    document.removeEventListener("pointermove", this.onPointerMove);
  };

  moveTooltip(event) {
    let shift = 15;
    const left = event.clientX + shift;
    const top = event.clientY + shift;

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }

  render(html) {
    this.element = document.createElement("div");
    this.element.className = "tooltip";
    this.element.innerHTML = html;

    document.body.append(this.element);
  }

  initialize() {
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener("pointerover", this.onPointerOver);
    document.addEventListener("pointerout", this.onPointerOut);
  }

  destroy() {
    document.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerover", this.onPointerOver);
    document.removeEventListener("pointerout", this.onPointerOut);
    this.remove();
    this.element = null;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
}

export default Tooltip;
