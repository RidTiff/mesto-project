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

const initialCards = [
    {
      name: 'Oxxxymiron',
      link: 'https://worldpodium.ru/sites/default/files/reper_anons.jpg'
    },
    {
      name: 'Неваляшка',
      link: 'https://i09.fotocdn.net/s103/8ec5ca804cd027ee/user_l/2181749682.jpg'
    },
    {
      name: 'Горгород',
      link: 'https://avatars.mds.yandex.net/get-zen_doc/1062011/pub_5b6d65f1b89e8d00a9d23868_5b6d6cb2b2cd8f00abdd9dc4/scale_1200'
    },
    {
      name: 'Мох',
      link: 'https://i.ytimg.com/vi/CfCit3iVZGg/maxresdefault.jpg'
    },
    {
      name: 'Кто убил Марка',
      link: 'https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/1/62/756375888740621.jpg'
    },
    {
      name: 'Вагабунд',
      link: 'https://avatars.mds.yandex.net/i?id=f3424c2484bb49761d2533931050079c-5101235-images-thumbs&n=13'
    }
  ]; 

for (let i = 0; i < initialCards.length; i++) {
    elements.prepend(createCard(initialCards[i].name, initialCards[i].link));
}