//Отвечает за отрисовку элементов на странице
export class Section {
  constructor({ data,renderer }, cardTemplate) {
    this._renderer = renderer;
    this._cardTemplate = cardTemplate;
    this._renderedItems = data;
  }

  //Функция, которая отвечает за создание и отрисовку данных на странице
  renderItems() {
    this._renderedItems.forEach(item => console.log('123'));
  }

  addItem(item) {
    this._cardTemplate.prepend(item);
  }
}
