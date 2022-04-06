// Попапы. Профиль
import { openPopup, closePopup } from './modal.js';
import { patchProfile, patchAvatar } from './api.js';

import { renderLoading } from './validate';


import {api} from './index'; 

const profile = document.querySelector('.profile');
const name = profile.querySelector('.prof-info__name');
const description = profile.querySelector('.prof-info__description');
const editButton = profile.querySelector('.prof-info__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');

export const formProfile = document.forms.profile;
const nameInput = formProfile.elements.name;
const descriptionInput = formProfile.elements.description;

function editProfile() {
  openPopup(popupProfile);
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
}

export function renderProfile(userName, userAbout) {
  name.textContent = userName;
  description.textContent = userAbout;
}

function submitProfile(evt) {

    evt.preventDefault();
    api.patchProfile(nameInput.value, descriptionInput.value)
        .then(() => {
            closePopup(popupProfile);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(formProfile, false);s
        })
}

const formAvatar = document.forms.avatar;
const formAvatarSubmit = formAvatar.querySelector(
  '.popup__submit_place_avatar'
);
const linkAvatar = formAvatar.elements.link;
const popupAvatar = document.querySelector('.popup_type_avatar');
const avatarElement = document.querySelector('.profile__avatar');

function editAvatar() {
  linkAvatar.value = '';
  openPopup(popupAvatar);
}

function submitAvatar(evt) {
  evt.preventDefault();
  patchAvatar(linkAvatar.value)
    .then(() => {
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(formAvatar, false);
    });
  formAvatarSubmit.setAttribute('disabled', true);
  formAvatarSubmit.classList.add('popup__submit_inactive');
}

export function renderAvatar(avatar) {
  avatarElement.src = avatar;
}

export default () => {
  editButton.addEventListener('click', editProfile);
  formProfile.addEventListener('submit', function (evt) {
    renderLoading(formProfile, true);
    submitProfile(evt);
  });
  document
    .querySelector('.profile__avatar-button')
    .addEventListener('click', editAvatar);
  formAvatar.addEventListener('submit', function (evt) {
    renderLoading(formAvatar, true);
    submitAvatar(evt);
  });
};
