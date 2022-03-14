//Попапы. Добавление карточки
import { openPopup, closePopup } from "./modal.js";
import { postCard, deleteCard, putLike, deleteLike } from "./api.js";

const popupAddCard = document.querySelector('.popup_type_new-card');

const elements = document.querySelector('.elements');

const formAddCard = document.forms.card;
const titleInput = formAddCard.elements.title;
const imageInput = formAddCard.elements.link;
const cardTemplate = document.querySelector('#card').content;

function createCard(title, image, author, likeCount, id) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const imageElement = cardElement.querySelector('.card__image');
    const likeElement = cardElement.querySelector('.card__like-heart');
    const countElement = cardElement.querySelector('.card__like-count');
    const deleteElement = cardElement.querySelector('.card__delete')

    cardElement.querySelector('.card__title').textContent = title;
    imageElement.setAttribute('src', image);
    imageElement.setAttribute('alt', title);
    if(!author) {
      deleteElement.remove();
    }
    countElement.textContent = likeCount;

    cardElement.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('card__like-heart')) {
        if (evt.target.classList.contains('card__like-heart_active')){
          likeElement.classList.remove('card__like-heart_active');
          deleteLike(id, countElement);
        } else {
          likeElement.classList.add('card__like-heart_active');
          putLike(id, countElement);
        }
      } else if (evt.target.classList.contains('card__delete')) {
        deleteCard(evt, id);
      } else if (evt.target.classList.contains('card__image')) {
        openImage(evt);
      }
    });

    return cardElement;
}

//Взаимодействие с карточкой 


export function renderLikes(countElement, number) {
  countElement.textContent = number;
}

function openAddCardPopup() {
  openPopup(popupAddCard);
}

function submitCard(evt) {
  evt.preventDefault();
  postCard(titleInput.value, imageInput.value);
  formAddCard.reset();
  formAddCard.elements.submit.classList.add('popup__submit_inactive');
  formAddCard.elements.submit.setAttribute('disabled', true);
  closePopup(popupAddCard);
}

// Попап для изображения
const popupImage = document.querySelector('.popup_type_image');
const imageInPopup = popupImage.querySelector('.popup__image');

function openPopupImage(image, caption) {
  imageInPopup.setAttribute('src', image);
  imageInPopup.setAttribute('alt', caption);
  popupImage.querySelector('.popup__caption').textContent = caption;
  openPopup(popupImage);
}

function openImage (evt) {
  openPopupImage(evt.target.src, evt.target.alt)
}

const showCard = (title, image, author, likeCount, id) => {
  elements.prepend(createCard(title, image, author, likeCount, id));
}

export {openAddCardPopup, submitCard, showCard};