export default class SortableTable {
  onClickHeader = (event) => {
    const divSortableHeader = event.target.closest('[data-sortable="true"]');

    const changeOrder = (order) => {
      const orders = {
        asc: "desc",
        desc: "asc",
      };

      return orders[order];
    };

    if (divSortableHeader) {
      const { id, order } = divSortableHeader.dataset;
      const newOrder = changeOrder(order);
      const sortedData = this.sortData(id, newOrder);
      const arrow = divSortableHeader.querySelector(
        ".sortable-table__sort-arrow"
      );

      divSortableHeader.dataset.order = newOrder;

      if (!arrow) {
        divSortableHeader.append(this.subElements.arrow);
      }

      this.subElements.body.innerHTML = this.getTableRows(sortedData);
    }
  };

  constructor(
    headerConfig = [],
    {
      data = [],
      sorted = {
        id: headerConfig.find((item) => item.sortable).id,
        order: "asc",
      },
    } = {}
  ) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.sorted = sorted;

    this.render();
  }

  render() {
    const { id, order } = this.sorted;
    const element = document.createElement("div");
    const sortedData = this.sortData(id, order);

    element.innerHTML = this.finalTemplate(sortedData);

    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);

    this.eventListeners();
  }

  eventListeners() {
    this.subElements.header.addEventListener("pointerdown", this.onClickHeader);
  }

  sortData(id, order) {
    const arr = [...this.data];
    const column = this.headerConfig.find((item) => item.id === id);
    const { sortType, customSorting } = column;
    const direction = order === "asc" ? 1 : -1;

    return arr.sort((a, b) => {
      if (sortType === "number") {
        return direction * (a[id] - b[id]);
      }

      if (sortType === "string") {
        return (
          direction *
          a[id].localeCompare(b[id], ["ru", "en"], { caseFirst: "upper" })
        );
      }

      if (sortType === "custom") {
        return direction * customSorting(a, b);
      }

      return;
    });
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

  headerTemplate() {
    return this.headerConfig
      .map((header) => {
        return this.getHeaderRow(header);
      })
      .join("");
  }

  getHeaderRow({ id, title, sortable }) {
    const order = this.sorted.id === id ? this.sorted.order : "asc";

    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${order}">
        <span>${title}</span>
        ${this.getHeaderSortArrow(id)}
      </div>
    `;
  }

  getHeaderSortArrow(id) {
    const order = this.sorted.id === id ? this.sorted.order : "";

    return order
      ? `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`
      : "";
  }

  getTableRows(data) {
    return data
      .map(
        (item) => `
      <div class="sortable-table__row">
        ${this.getTableRow(item)}
      </div>`
      )
      .join("");
  }

  getTableRow(item) {
    const cells = this.headerConfig.map(({ id, template }) => {
      return {
        id,
        template,
      };
    });

    return cells
      .map(({ id, template }) => {
        return template
          ? template(item[id])
          : `<div class="sortable-table__cell">${item[id]}</div>`;
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

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}
