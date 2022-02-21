//Попапы. Добавление карточки
import { openForm, closeForm } from "./popup.js";

const popupAddCard = document.querySelector('.popup_type_new-card')

const formAddCard = document.forms.card;
const titleInput = formAddCard.elements.title;
const imageInput = formAddCard.elements.link;

function createCard(title, image) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const imageElement = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = title;
    imageElement.setAttribute('src', image);
    imageElement.setAttribute('alt', title);

    return cardElement;
}

//Взаимодействие с карточкой 

const elements = document.querySelector('.elements')

const cardInteraction = () => {
  elements.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__like')) {
      evt.target.classList.toggle('card__like_active');
    } else if (evt.target.classList.contains('card__delete')) {
      evt.target.parentElement.remove();
    } else if (evt.target.classList.contains('card__image')) {
      openImage(evt);
    }
  });
}

function addCard() {
  openForm(popupAddCard);
}

function submitCard(evt) {
  evt.preventDefault();
  elements.prepend(createCard(titleInput.value, imageInput.value));
  formAddCard.reset();
  closeForm(popupAddCard);
}

// Попап для изображения
const popupImage = document.querySelector('.popup_type_image')

function openPopupImage(image, caption) {
  popupImage.querySelector('.popup__image').setAttribute('src', image);
  popupImage.querySelector('.popup__image').setAttribute('alt', caption);
  popupImage.querySelector('.popup__caption').textContent = caption;
  openForm(popupImage);
}

function openImage (evt) {
  openPopupImage(evt.target.src, evt.target.alt)
}

//Создание 6 начальных карточек

import waterfall from '../images/waterfall.jpg';
import flashlight from '../images/flashlight.jpg';
import bamboo from '../images/bamboo.jpg';
import motor from '../images/motor.jpg';
import eye from '../images/eye.jpg';
import lion from '../images/lion.jpg';

const initialCards = [
    {
      name: 'Водопад',
      link: waterfall
    },
    {
      name: 'Фонарь и лёд',
      link: flashlight
    },
    {
      name: 'Лестница в бамбуке',
      link: bamboo
    },
    {
      name: 'Мотор',
      link: motor
    },
    {
      name: 'Глаз-гипноз',
      link: eye
    },
    {
      name: 'Лев',
      link: lion
    }
]; 

const createStartCards = () => {
    for (let i = 0; i < initialCards.length; i++) {
    elements.prepend(createCard(initialCards[i].name, initialCards[i].link));
    }
}

export {addCard, submitCard, createStartCards, cardInteraction};