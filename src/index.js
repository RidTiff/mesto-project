import './index.css';

import {enableValidation} from './forms.js'; //Формы
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});

import {popupInteraction} from './components/popup.js'; //Попапы
popupInteraction();

import editProfile from './components/profile.js'; //Профиль

editProfile();

import {openAddCardPopup, submitCard, createStartCards} from './components/cards.js'; //Карточки
document.querySelector('.profile__add-button').addEventListener('click', openAddCardPopup);
document.forms.card.addEventListener('submit', submitCard);
createStartCards();