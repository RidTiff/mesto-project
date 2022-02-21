import './index.css';

import {enableValidation} from './scripts/forms.js'; //Формы
enableValidation();

import {popupInteraction} from './scripts/popup.js'; //Попапы
popupInteraction();

import editProfile from './scripts/profile.js'; //Профиль

editProfile();

import {addCard, submitCard, createStartCards, cardInteraction} from './scripts/cards.js'; //Карточки
document.querySelector('.profile__add-button').addEventListener('click', addCard);
document.forms.card.addEventListener('submit', submitCard);
createStartCards();
cardInteraction();


