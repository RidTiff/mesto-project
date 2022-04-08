import '../index.css';

import { Api } from './api.js';

import { FormValidator } from './FormValidator.js';

import { enableValidation } from './validate.js';

import { renderProfile } from './profile.js';

import { Card } from './card.js';

import { Section } from './Section.js';




/*import { UserInfo } from './UserInfo.js';

import { elements } from './card.js';

import { Section } from './Section.js';*/

const userAvatar = document.querySelector('.profile__avatar');

export const api = new Api({host:'https://nomoreparties.co/v1/plus-cohort-6',authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c'});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});

const cardsData = [];


const cardsSection = new Section({data:cardsData, renderer: (item) => {
  const card = new Card(item,'.card');
  const cardElement = card.generate();
  cardsSection.addItem(cardElement);
}},'.elements')

api.getUser()
    .then((user) => {
        renderProfile(user.name, user.about);
        userAvatar.src = user.avatar;
        api.getCards().then((cards) => {
          cards.forEach(element => {
              const userId = user._id;
              let deleteCard = false;
              let checkLike = false;
              if (element.owner._id == userId) {
                  deleteCard = true;
              }
              for (let i = 0; i < element.likes.length; i++) {
                  if (element.likes[i]._id == userId) {
                      checkLike = true;
                      break
                  }
              };
              cardsData.push({title:element.name, image:element.link,author:deleteCard,likeCount:element.likes.length,putMyLike:checkLike,id:element._id})
          });
          
          cardsSection.renderItems();
      })
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })



/*const section = new Section(
  {
    renderer(data) {
      section.addItem(createCard(data));
    },
  },
  elements
);*/


/*getUser()
  .then((user) => {
    renderProfile(user.name, user.about);
    userAvatar.src = user.avatar;
    return getCards(user).catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

import { enableValidation } from './validate.js'; //Формы

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});

import { popupInteraction } from './modal.js'; //Попапы
popupInteraction();

import editProfile from './profile.js'; //Профиль
editProfile();

import { openAddCardPopup, submitCard } from './card.js'; //Карточки
import { get } from 'core-js/core/dict';
document
  .querySelector('.profile__add-button')
  .addEventListener('click', openAddCardPopup);
document.forms.card.addEventListener('submit', submitCard);*/


