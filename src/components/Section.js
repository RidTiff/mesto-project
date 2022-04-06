//Отвечает за отрисовку элементов на странице
export class Section {
  constructor({ renderer }, cardTemplate) {
    this._renderer = renderer;
    this._cardTemplate = cardTemplate;
  }

  //Функция, которая отвечает за создание и отрисовку данных на странице
  renderer(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._cardTemplate.prepend(item);
  }
}
