export default class ColumnChart {
	element;
	chartHeight = 50;
  
	constructor({
	  data = [],
	  label = "",
	  value = 0,
	  link = "",
	  formatHeading = (data) => data,
	} = {}) {
	  this.data = data;
	  this.label = label;
	  this.value = value;
	  this.link = link;
	  this.formatHeading = formatHeading(value);
  
	  this.render();
	}
  
	getTemplate() {
	  return `
	  <div class="column-chart_loading">
	  <div class="column-chart" style="--chart-height: ${this.chartHeight}">
		${this.showTitle()}
		<div class="column-chart__container">
		  ${this.showHeader()}
		  <div data-element="body" class="column-chart__chart">
			  ${this.getColumnProps(this.data)}
		  </div>
		</div>
	  </div>
	</div>
	  `;
	}
  
	showLink() {
	  return this.link
		? `<a href=${this.link} class="column-chart__link">View all</a>`
		: "";
	}
  
	showTitle() {
	  return `
	  <div class="column-chart__title">
		  Total ${this.label}
		  ${this.showLink()}
		</div>
	  `;
	}
  
	showHeader() {
	  return `
	  <div data-element="header" class="column-chart__header">${this.formatHeading}</div>
	  `;
	}
  
	getColumnProps(data) {
	  const maxValue = Math.max(...data);
	  const scale = this.chartHeight / maxValue;
  
	  const result = data
		.map((item) => {
		  const value = String(Math.floor(item * scale));
		  const percent = ((item / maxValue) * 100).toFixed(0) + "%";
  
		  return `<div style="--value: ${value}" data-tooltip=${percent}></div>`;
		})
		.join("");
  
	  return result;
	}
  
	render() {
	  const element = document.createElement("div");
  
	  element.innerHTML = this.getTemplate();
  
	  this.element = element.firstElementChild;
  
	  if (this.data.length) {
		this.element.classList.remove(`column-chart_loading`);
	  }
	}
  
	update(props = []) {
	  this.data = this.getColumnProps(props);
	}
  
	remove() {
	  this.element.remove();
	}
  
	destroy() {
	  this.remove();
	  this.element = null;
	}
  }