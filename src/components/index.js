import '../index.css';

import { Api } from './Api.js';

import { FormValidator } from './FormValidator.js';

import { enableValidation } from './validate.js';

import { renderProfile } from './profile.js';

import { Card } from './Card.js';

import { Section } from './Section.js';

import { UserInfo } from './UserInfo.js';

import { PopupWithForm } from './PopupWithForm.js';

import { PopupWithImage } from './PopupWithImage.js';

export const api = new Api({host:'https://nomoreparties.co/v1/plus-cohort-6',authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c'});

export const imgPopup = new PopupWithImage('.popup_type_image');


const userAvatar = document.querySelector('.profile__avatar');

const cardsData = [];

const cardsSection = new Section({data:cardsData, renderer: (item) => {
  const card = new Card(item,'.card');
  const cardElement = card.generate();
  cardsSection.addItem(cardElement);
}},'.elements')


export const addCardPopup = new PopupWithForm('.popup_type_new-card',(data) => {
  addCardPopup.toggleSaveBtnCaption('Сохранение...');

  api.postCard(data.title,data.link).then((result) => {
    const cardData = {title:result.name,image:result.link,author:1,putMyLike:false,likeCount:0,id:result._id};
    const card = new Card(cardData,'.card');
    const cardElement = card.generate();
    cardsSection.addItem(cardElement);
  }).then((result) => {
    addCardPopup.close();
    addCardPopup.toggleSaveBtnCaption('Создать');
  })
});

const editProfileForm = new PopupWithForm('.popup_type_profile',(data) => {
  editProfileForm.toggleSaveBtnCaption('Сохранение...');
  userInfo.setUserInfo(data.name,data.description,api).then((res) => {
    editProfileForm.toggleSaveBtnCaption('Сохранить');
    editProfileForm.close();
  });
})

const editAvatarForm = new PopupWithForm('.popup_type_avatar',(data) => {
  editAvatarForm.toggleSaveBtnCaption('Сохранение...');
  api.patchAvatar(data.link).then((result) => {
    userAvatar.setAttribute('src',result.avatar);
    editAvatarForm.toggleSaveBtnCaption('Сохранить');
    editAvatarForm.close();
  })
})

const userInfo = new UserInfo({nameSlector:'.prof-info__name',descriptionSlector:'.prof-info__description'});

const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.prof-info__edit-button');
const editAvatarButton = document.querySelector('.profile__avatar-button');

editAvatarButton.addEventListener('click', (evt) => {
  editAvatarForm.open();
})

addCardButton.addEventListener('click',(evt) => {
  addCardPopup.open();
})


const nameInput = document.querySelector('.popup__input_value_name');
const aboutInput = document.querySelector('.popup__input_value_description');

editProfileButton.addEventListener('click',(evt) => {
  const data = userInfo.getUserInfo(api);
  nameInput.value = data.name;
  aboutInput.value = data.about;
  editProfileForm.open();
})


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});

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

