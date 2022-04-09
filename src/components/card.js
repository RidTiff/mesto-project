//Попапы. Добавление карточки

/*import { openPopup, closePopup } from "./modal.js";*/
import {api} from "./index.js";
import { imgPopup } from "./index.js";

const popupAddCard = document.querySelector('.popup_type_new-card');

export const elements = document.querySelector('.elements');

const formAddCard = document.forms.card;
const titleInput = formAddCard.elements.title;
const imageInput = formAddCard.elements.link;
const cardTemplate = document.querySelector('#card').content;


//Взаимодействие с карточкой

export function renderLikes(countElement, number) {
  countElement.textContent = number;
}

function openAddCardPopup() {
  openPopup(popupAddCard);
}

function submitCard(evt) {
  evt.preventDefault();
  api.postCard(titleInput.value, imageInput.value)
    .then(() => {
      closePopup(popupAddCard);
      formAddCard.reset();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  formAddCard.elements.submit.classList.add('popup__submit_inactive');
  formAddCard.elements.submit.setAttribute('disabled', true);
}

// Попап для изображения
const popupImage = document.querySelector('.popup_type_image');
const imageInPopup = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

function openPopupImage(image, caption) {
  imageInPopup.setAttribute('src', image);
  imageInPopup.setAttribute('alt', caption);
  popupCaption.textContent = caption;
  openPopup(popupImage);
}

function openImage(evt) {
  openPopupImage(evt.target.src, evt.target.alt);
}

const showCard = (title, image, author, likeCount, putMyLike, id) => {
  const card = new Card({title:title, image:image, author:author, likeCount:likeCount, putMyLike:putMyLike, id:id})
  elements.prepend(card.generate());
}

export {openAddCardPopup, submitCard, showCard};


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
      console.log('click');
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
