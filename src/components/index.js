import '../index.css';

/*const userAvatar = document.querySelector('.profile__avatar');

import {getUser, getCards} from './api.js';
import {renderProfile} from './profile.js'*/
import {Api} from './api.js';

export const api = new Api({host:'https://nomoreparties.co/v1/plus-cohort-6', authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c'});



api.getUser()
    .then((user) => {
        renderProfile(user.name, user.about);
        userAvatar.src = user.avatar;
        return getCards(user)
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })



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
import { get } from 'core-js/core/dict';
document.querySelector('.profile__add-button').addEventListener('click', openAddCardPopup);
document.forms.card.addEventListener('submit', submitCard);


