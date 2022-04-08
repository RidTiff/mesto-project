//Отвечает за отрисовку элементов на странице
export class Section {
  constructor({ data, renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
    this._renderedItems = data;
  }
  //Функция, которая отвечает за создание и отрисовку данных на странице
  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }
  addItem(item) {
    this._container.prepend(item);
  }
}
