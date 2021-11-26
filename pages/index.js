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
    console.log(cardElement.querySelector('.card__title'));
    cardElement.querySelector('.card__title').textContent = title;
    const imageElement = cardElement.querySelector('.card__image');
    imageElement.setAttribute('src', image);
    imageElement.setAttribute('alt', title);
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

