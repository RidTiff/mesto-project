//Попапы. Добавление карточки
import { openPopup, closePopup } from "./modal.js";
import { postCard, deleteCard, putLike, deleteLike } from "./api.js";
import {api} from "./index.js";

const popupAddCard = document.querySelector('.popup_type_new-card');

const elements = document.querySelector('.elements');

const formAddCard = document.forms.card;
const titleInput = formAddCard.elements.title;
const imageInput = formAddCard.elements.link;
const cardTemplate = document.querySelector('#card').content;

function createCard(title, image, author, likeCount, putMyLike, id) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const imageElement = cardElement.querySelector('.card__image');
    const likeElement = cardElement.querySelector('.card__like-heart');
    const countElement = cardElement.querySelector('.card__like-count');
    const deleteElement = cardElement.querySelector('.card__delete')

    cardElement.querySelector('.card__title').textContent = title;
    imageElement.setAttribute('src', image);
    imageElement.setAttribute('alt', title);

    if(!author) {
      deleteElement.remove();
    }

    if(putMyLike) {
      likeElement.classList.add('card__like-heart_active');
    }

    countElement.textContent = likeCount;

    cardElement.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('card__like-heart')) {
        if (evt.target.classList.contains('card__like-heart_active')){
          deleteLike(id, countElement)
            .then(() => {
              likeElement.classList.remove('card__like-heart_active');
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        } else {
          putLike(id, countElement)
            .then(() => {
              likeElement.classList.add('card__like-heart_active');
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        }
      } else if (evt.target.classList.contains('card__delete')) {
        deleteCard(evt, id)
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else if (evt.target.classList.contains('card__image')) {
        openImage(evt);
      }
    });

    return cardElement;
}

//Взаимодействие с карточкой 


export function renderLikes(countElement, number) {
  countElement.textContent = number;
}

function openAddCardPopup() {
  openPopup(popupAddCard);
}

function submitCard(evt) {
  evt.preventDefault();
  postCard(titleInput.value, imageInput.value)
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
const popupCaption = popupImage.querySelector('.popup__caption')

function openPopupImage(image, caption) {
  imageInPopup.setAttribute('src', image);
  imageInPopup.setAttribute('alt', caption);
  popupCaption.textContent = caption;
  openPopup(popupImage);
}

function openImage (evt) {
  openPopupImage(evt.target.src, evt.target.alt)
}

const showCard = (title, image, author, likeCount, putMyLike, id) => {
  elements.prepend(createCard(title, image, author, likeCount, putMyLike, id));
}

export {openAddCardPopup, submitCard, showCard};


//Класс Card

class Card {
  constructor (data, selector){
    this.title = data.title;
    this.image = data.image;
    this.author = data.author;
    this.putMyLike = data.putMyLike;
    this.likeCount = data.likeCount;
    this.selector = selector;
  }

  _getElement() {
    const cardElement = cardTemplate.querySelector(this.selector).cloneNode(true);
    return cardElement;
  }

generate() {
  this._element = this._getElement();
  this._element._setEventListeners();

  const imageElement = this._element.querySelector('.card__image');
  const likeElement = this._element.querySelector('.card__like-heart');
  const countElement = this._element.querySelector('.card__like-count');
  const deleteElement = this._element.querySelector('.card__delete')

  cardElement.querySelector('.card__title').textContent = this.title;
  imageElement.setAttribute('src', this.image);
  imageElement.setAttribute('alt', this.title);

    if(!this.author) {
      deleteElement.remove();
    }

    if(this.putMyLike) {
      likeElement.classList.add('card__like-heart_active');
    }

    countElement.textContent = this.likeCount;

  return this._element;
}


_setEventListeners() {
  this._element.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__like-heart')) {
      if (evt.target.classList.contains('card__like-heart_active')){
        api.deleteLike(id, countElement)
          .then(() => {
            likeElement.classList.remove('card__like-heart_active');
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        api.putLike(id, countElement)
          .then(() => {
            likeElement.classList.add('card__like-heart_active');
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    } else if (evt.target.classList.contains('card__delete')) {
      api.deleteCard(evt, id)
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else if (evt.target.classList.contains('card__image')) {
      openPopupImage(evt.target.src, evt.target.alt);
    }
  });
}

}
