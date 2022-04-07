//Отвечает за отрисовку элементов на странице
export class Section {
  constructor({ renderItems }, cardTemplate) {
    this._renderer = renderItems;
    this._cardTemplate = cardTemplate;
  }

  //Функция, которая отвечает за создание и отрисовку данных на странице
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._cardTemplate.prepend(item);
  }
}
