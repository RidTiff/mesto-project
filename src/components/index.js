//Импорты

import '../index.css';

import { Api } from './Api.js';

import {FormValidator} from "./FormValidator.js";

import { Card } from './Card.js';

import { Section } from './Section.js';

import { UserInfo } from './UserInfo.js';

import { PopupWithForm } from './PopupWithForm.js';

import { PopupWithImage } from './PopupWithImage.js';

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

const formCardValidator = new FormValidator(settings, document.forms.card);
formCardValidator.enableValidation();

const formProfileValidator = new FormValidator(settings, document.forms.profile);
formProfileValidator.enableValidation();

const formAvatarValidator = new FormValidator(settings, document.forms.avatar);
formAvatarValidator.enableValidation();


//Объявление констант и навешивание коллбэков

const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.prof-info__edit-button');
const editAvatarButton = document.querySelector('.profile__avatar-button');

editAvatarButton.addEventListener('click', () => {
  formAvatarValidator.resetValidation();
  editAvatarForm.open();
})

addCardButton.addEventListener('click',() => {
  formCardValidator.resetValidation();
  addCardPopup.open();
})


const nameInput = document.querySelector('.popup__input_value_name');
const aboutInput = document.querySelector('.popup__input_value_description');

editProfileButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  aboutInput.value = data.about;
  formProfileValidator.resetValidation();
  editProfileForm.open();
})


function putLike(card) {
  api.putLike(card.getId())
    .then((res) => {
        card.putLike(res)
    })
    .catch((err) => {
        console.log(err);
    });
}

function deleteLike(card) {
  api.deleteLike(card.getId())
    .then((res) => {
        card.deleteLike(res)
    })
    .catch((err) => {
        console.log(err);
    });
}

function deleteCard(card) {
  api.deleteCard(card.getId())
  .then(() => {
    card.deleteCard()
  })
  .catch((err) => {
    console.log(err);
  });
}

function openImgPopup(card) {
  imgPopup.open(card.image, card.title);
}


//Объявление классов

const api = new Api({
  host:'https://nomoreparties.co/v1/plus-cohort-6', 
  headers: {
    authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c',
    'Content-Type': 'application/json; charset=UTF-8'
  }
});

const imgPopup = new PopupWithImage('.popup_type_image');
imgPopup.setEventListener();

const cardsSection = new Section({renderer: (item) => {
  cardsSection.addItem(createCard(item));
}},'.elements')


function createCard(data) {
  const card = new Card(data,'#card');
  const cardElement = card.generate();
  return cardElement
}

const addCardPopup = new PopupWithForm('.popup_type_new-card',(data) => {
  addCardPopup.toggleSaveBtnCaption('Сохранение...');

  api.postCard(data.title,data.link)
    .then((result) => {
      const cardData = {
        title: result.name,
        image: result.link,
        author: true,
        putMyLike: false,
        likeCount: 0,
        id: result._id,
        putLike,
        deleteLike,
        deleteCard,
        openImgPopup
      };
      cardsSection.addItem(createCard(cardData));
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      addCardPopup.toggleSaveBtnCaption('Создать');
    })
});

addCardPopup.setEventListener();

const editProfileForm = new PopupWithForm('.popup_type_profile',(data) => {
  editProfileForm.toggleSaveBtnCaption('Сохранение...');

  api.patchProfile(data.name,data.description)
    .then((res) => {
      userInfo.setUserInfo(res);
      editProfileForm.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {editProfileForm.toggleSaveBtnCaption('Сохранить');});
})

editProfileForm.setEventListener();

const editAvatarForm = new PopupWithForm('.popup_type_avatar',(data) => {
  editAvatarForm.toggleSaveBtnCaption('Сохранение...');
  api.patchAvatar(data.link)
  .then((res) => {
    userInfo.setUserInfo(res);
    editAvatarForm.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(()=>{editAvatarForm.toggleSaveBtnCaption('Сохранить');})
})

editAvatarForm.setEventListener();

const userInfo = new UserInfo({
  nameSelector: '.prof-info__name',
  descriptionSelector: '.prof-info__description',
  avatarSelector: '.profile__avatar'
});




const cardsData = [];

api.getUser()
  .then((user) => {
    userInfo.setUserInfo(user);
    const userId = user._id;
    api.getCards()
      .then((cards) => {
        cards.forEach(element => {
          let author = false;
          let checkLike = false;
          if (element.owner._id == userId) {
              author = true;
          }
          for (let i = 0; i < element.likes.length; i++) {
              if (element.likes[i]._id == userId) {
                  checkLike = true;
                  break
              }
          };
          cardsData.push({
            title:element.name, 
            image:element.link,
            author:author,
            likeCount:element.likes.length,
            putMyLike:checkLike,
            id:element._id,
            putLike,
            deleteLike,
            deleteCard,
            openImgPopup
          })
        });
        cardsSection.renderItems(cardsData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })