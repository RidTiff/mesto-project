// Попапы. Профиль
import { openPopup, closePopup } from "./modal.js";

const profile = document.querySelector('.profile')
const name = profile.querySelector('.prof-info__name');
const description = profile.querySelector('.prof-info__description');
const editButton = profile.querySelector('.prof-info__edit-button')
const popupProfile = document.querySelector('.popup_type_profile')
const closeButtonProfile = popupProfile.querySelector('.popup__close_type_profile')

const formProfile = document.forms.profile;
const nameInput = formProfile.elements.name;
const descriptionInput = formProfile.elements.description;



function editProfile() {
    openPopup(popupProfile);
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;
}

function submitProfile(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    description.textContent = descriptionInput.value;
    closePopup(popupProfile);
}

export default () => {
    editButton.addEventListener('click', editProfile);
    formProfile.addEventListener('submit', submitProfile);
}

