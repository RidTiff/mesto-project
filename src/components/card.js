import {api,imgPopup} from "./index.js";


//Класс Card

export class Card {
  constructor (data, selector){
    this.title = data.title;
    this.image = data.image;
    this.author = data.author;
    this.putMyLike = data.putMyLike;
    this.likeCount = data.likeCount;
    this.selector = selector;
    this.id = data.id;
  }

  _getElement() {
    const cardElement = document.querySelector('#card').content.querySelector(this.selector).cloneNode(true);
    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners(this);

    this.imageElement = this._element.querySelector('.card__image');
    this.likeElement = this._element.querySelector('.card__like-heart');
    this.countElement = this._element.querySelector('.card__like-count');
    this.deleteElement = this._element.querySelector('.card__delete')

    this._element.querySelector('.card__title').textContent = this.title;
    this.imageElement.setAttribute('src', this.image);
    this.imageElement.setAttribute('alt', this.title);

      if(!this.author) {
        this.deleteElement.remove();
      }

      if(this.putMyLike) {
        this.likeElement.classList.add('card__like-heart_active');
      }

      this.countElement.textContent = this.likeCount;

    return this._element;
  }


_setEventListeners(element) {
  this._element.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__like-heart')) {
      if (evt.target.classList.contains('card__like-heart_active')){
        api.deleteLike(element.id)
          .then((result) => {
            element.likeElement.classList.remove('card__like-heart_active');
            element.countElement.textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        api.putLike(element.id)
          .then((result) => {
            element.likeElement.classList.add('card__like-heart_active');
            element.countElement.textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    } else if (evt.target.classList.contains('card__delete')) {
      api.deleteCard(evt, element.id).then((result) => {
        element._element.remove();
      })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else if (evt.target.classList.contains('card__image')) {
      imgPopup.open(element.image,element.title);
    }
  });
}

}
