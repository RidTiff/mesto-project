//Отвечает за отрисовку элементов на странице
export class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  //Функция, которая отвечает за создание и отрисовку данных на странице
  renderItems(data) {
    data.forEach(item => this._renderer(item));
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
