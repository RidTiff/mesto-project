import '../index.css';

const userAvatar = document.querySelector('.profile__avatar');

import {getUser, getCards} from './api.js';
getUser(userAvatar);
getCards();


import {enableValidation} from './validate.js'; //Формы
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});

import {popupInteraction} from './modal.js'; //Попапы
popupInteraction();

import editProfile from './profile.js'; //Профиль
editProfile();

import {openAddCardPopup, submitCard} from './card.js'; //Карточки
document.querySelector('.profile__add-button').addEventListener('click', openAddCardPopup);
document.forms.card.addEventListener('submit', submitCard);
