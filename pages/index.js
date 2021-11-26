// Попапы. Профиль

const profile = document.querySelector('.profile')
const name = profile.querySelector('.prof-info__name');
const description = profile.querySelector('.prof-info__description');
const editButton = profile.querySelector('.prof-info__edit-button')
const popup = document.querySelector('.popup')
const popupProfile = document.querySelector('.popup_type_profile')
const closeButtonProfile = popupProfile.querySelector('.popup__close_type_profile')
const formProfile = popupProfile.querySelector('.popup__form_type_profile')
const nameInput = popupProfile.querySelector('.popup__input_value_name');
const descriptionInput = popupProfile.querySelector('.popup__input_value_description');




function openForm(popup) {
    popup.classList.add('popup_opened');
}

function closeForm(popup) {
    popup.classList.remove('popup_opened');
}

function editProfile() {
    openForm(popupProfile);
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;
}

function submitProfile(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    description.textContent = descriptionInput.value;
    closeForm(popupProfile);
}

editButton.addEventListener('click', editProfile);
formProfile.addEventListener('submit', submitProfile);
closeButtonProfile.addEventListener('click', function () {
    closeForm(popupProfile);
})


//Попапы. Добавление карточки

const elements = document.querySelector('.elements')
const addCardButton = profile.querySelector('.profile__add-button')
const popupAddCard = document.querySelector('.popup_type_new-card')
const closeButtonAddCard = popupAddCard.querySelector('.popup__close_type_new-card')
const formAddCard = popupAddCard.querySelector('.popup__form_type_new-card')
const titleInput = formAddCard.querySelector('.popup__input_value_title')
const imageInput = formAddCard.querySelector('.popup__input_value_image-link')

function createCard(title, image) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const imageElement = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = title;
    imageElement.setAttribute('src', image);
    imageElement.setAttribute('alt', title);

    cardElement.querySelector('.card__like').addEventListener('click', like)

    cardElement.querySelector('.card__delete').addEventListener('click', deleteCard)

    return cardElement;
}

function addCard() {
    openForm(popupAddCard);
}

function submitCard(evt) {
    evt.preventDefault();
    elements.prepend(createCard(titleInput.value, imageInput.value));
    closeForm(popupAddCard);
}

addCardButton.addEventListener('click', addCard);
formAddCard.addEventListener('submit', submitCard)
closeButtonAddCard.addEventListener('click', function () {
    closeForm(popupAddCard);
})

//Создание 6 начальных карточек

const initialCards = [
    {
      name: 'Водопад',
      link: 'https://images.unsplash.com/photo-1507896064687-d56470bc1cfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Фонарь и лёд',
      link: 'https://images.unsplash.com/photo-1528701790053-56b0f31e4577?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=643&q=80'
    },
    {
      name: 'Лестница в бамбуке',
      link: 'https://images.unsplash.com/photo-1607619662634-3ac55ec0e216?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    },
    {
      name: 'Мотор',
      link: 'https://images.unsplash.com/photo-1458942521101-2f2fb506cee3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Глаз-гипноз',
      link: 'https://images.unsplash.com/photo-1495045197504-5128e3c8469f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80'
    },
    {
      name: 'Лев',
      link: 'https://images.unsplash.com/photo-1517649281203-dad836b4abe5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    }
  ]; 

for (let i = 0; i < initialCards.length; i++) {
    elements.prepend(createCard(initialCards[i].name, initialCards[i].link));
}

//Лайк

function like (evt) {
    evt.target.classList.toggle('card__like_active')
}

//Удаление карточки

function deleteCard (evt) {
    console.log(evt.target.parentElement);
    evt.target.parentElement.remove();
}