import '../index.css';

const userAvatar = document.querySelector('.profile__avatar');

import { name, description, avatarElement, selectors } from './profile.js';
console.log(selectors);

import { Api } from './api.js';
import { Card } from './card.js';
import { renderProfile } from './profile.js';
import { UserInfo } from './UserInfo.js';
import { elements } from './card.js';
import { Section } from './Section.js';

const getApi = new Api({
  host: 'https://nomoreparties.co/v1/plus-cohort-6',
  authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c',
});

const userApi = getApi.getUser();
const cardsApi = getApi.getCards();

//Класс профиля
const profileInfo = new UserInfo(selectors);

// Всё с сервера

Promise.all([userApi, cardsApi])
  .then(([user, cards]) => {
    profileInfo.setUserInfo(user);
    profileInfo.setUserAvatar(user);
    section.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

const showCard = (data) => {
  // const showCard = (data, selector) => {
  const card = new Card({
    title,
    image,
    author,
    likeCount,
    putMyLike,
    id,
  });

  const cardElement = card.generate(data);
  return cardElement;
};

const section = new Section(
  {
    renderItems(data) {
      section.addItem(showCard(data));
    },
  },
  elements
);

import { enableValidation } from './validate.js'; //Формы

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});

//import { popupInteraction } from './modal.js'; //Попапы
// popupInteraction();

import editProfile from './profile.js'; //Профиль
editProfile();

// import { openAddCardPopup, submitCard } from './card.js'; //Карточки
import { get } from 'core-js/core/dict';
// document
//   .querySelector('.profile__add-button')
//   .addEventListener('click', openAddCardPopup);
// document.forms.card.addEventListener('submit', submitCard);
