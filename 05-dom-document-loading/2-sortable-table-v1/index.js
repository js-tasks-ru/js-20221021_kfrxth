export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();
  }

  render() {
    const element = document.createElement("div");

    element.innerHTML = this.finalTemplate();

    this.element = element.firstElementChild;

    this.subElements = this.getSubElements();
  }

  finalTemplate() {
    return `
		  <div data-element="productsContainer" class="products-list__container">
			<div class="sortable-table">
			  <div data-element="header" class="sortable-table__header sortable-table__row">
			  ${this.headerTemplate()}
			  </div>
			  <div data-element="body" class="sortable-table__body">
			  ${this.bodyTemplate()}
			  </div>
			</div>
		  </div>
		`;
  }

  headerTemplate() {
    return this.headerConfig
      .map((header) => {
        return `
			<div class="sortable-table__cell" data-id="${header.id}" data-sortable="${header.sortable}">
			  <span>${header.title}</span>
			</div>`;
      })
      .join("");
  }

  bodyTemplate() {
    return this.data
      .map((body) => {
        return `<a class="sortable-table__row">
					  ${this.headerConfig
              .map((column) => {
                if (column.template) {
                  return column.template(body[column.id]);
                } else {
                  return `<div class="sortable-table__cell">${
                    body[column.id]
                  }</div>`;
                }
              })
              .join("")}</a>`;
      })
      .join("");
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll("[data-element]");

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    return result;
  }

  sort(sortValue, sortOrder = "asc") {
    const sortType = this.headerConfig.find(
      (obj) => obj.id === sortValue
    ).sortType;

    function compareFunction(a, b) {
      return a.localeCompare(b, ["ru", "en"], { caseFirst: "upper" });
    }

    this.data.sort((a, b) => {
      if (sortOrder === "asc" && sortType === "number") {
        return a[sortValue] - b[sortValue];
      }

      if (sortOrder === "desc" && sortType === "number") {
        return b[sortValue] - a[sortValue];
      }

      if (sortOrder === "desc" && sortType === "string") {
        return compareFunction(b[sortValue], a[sortValue]);
      }

      if (sortOrder === "asc" && sortType === "string") {
        return compareFunction(a[sortValue], b[sortValue]);
      }
    });

    this.subElements.body.innerHTML = this.bodyTemplate();
    this.subElements.header
      .querySelectorAll("[data-order]")
      .forEach((element) => {
        element.removeAttribute("data-order");
      });
    this.subElements.header
      .querySelector('[data-id="' + sortValue + '"]')
      .setAttribute("data-order", sortOrder);
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
