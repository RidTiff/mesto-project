//Класс Card

export class Card {
  constructor (data, selector){
    this.title = data.title;
    this.image = data.image;
    this._author = data.author;

    this._putMyLike = data.putMyLike;
    this._likeCount = data.likeCount;

    this._selector = selector;

    this._id = data.id;
    this._putLike = data.putLike;
    this._deleteLike = data.deleteLike;
    this._openImgPopup = data.openImgPopup;
    this._deleteCard = data.deleteCard;

  }

  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  generate() {
    this._element = this._getElement();

    this._imageElement = this._element.querySelector('.card__image');
    this._likeElement = this._element.querySelector('.card__like-heart');

    this._countElement = this._element.querySelector('.card__like-count');
    this._deleteElement = this._element.querySelector('.card__delete')

    this._element.querySelector('.card__title').textContent = this.title;
    this._imageElement.setAttribute('src', this.image);
    this._imageElement.setAttribute('alt', this.title);

    if(!this._author) {
      this._deleteElement.remove();
    }
    if(this._putMyLike) {
      this._likeElement.classList.add('card__like-heart_active');
    }
    this._countElement.textContent = this._likeCount;
    
    this._setEventListeners();

    return this._element;
  }

  getId() {
    return this._id;
  }

  putLike(res) {
    this._likeElement.classList.add('card__like-heart_active');
    this._countElement.textContent = res.likes.length;
  }

  deleteLike(res) {
    this._likeElement.classList.remove('card__like-heart_active');
    this._countElement.textContent = res.likes.length;
  }

  deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click', () => {
      if(this._likeElement.classList.contains('card__like-heart_active')) {
        this._deleteLike(this);
      } else {
        this._putLike(this);
      }
    })

    this._deleteElement.addEventListener('click', () => {
      this._deleteCard(this);
    })

    this._imageElement.addEventListener('click', () => {
      this._openImgPopup(this);
    })
  }
}
