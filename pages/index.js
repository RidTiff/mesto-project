let profile = document.querySelector('.profile')
let name = profile.querySelector('.prof-info__name');
let description = profile.querySelector('.prof-info__description');
let editButton = profile.querySelector('.prof-info__edit-button')
let popup = document.querySelector('.popup')
let containerForm = popup.querySelector('.popup__container_place_profile')
let closeButton = popup.querySelector('.popup__close')
let form = popup.querySelector('.popup__form')
let nameInput = popup.querySelector('.popup__input_value_name');
let descriptionInput = popup.querySelector('.popup__input_value_description');



function openPopup() {
    popup.classList.add('popup_opened')
}

function closePopup() {
    popup.classList.remove('popup_opened')
}

function openForm() {
    containerForm.classList.add('.popup__container_opened')
    openPopup();
}

function editProfile() {
    openForm();
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;
}

function submitProfile(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    description.textContent = descriptionInput.value;
    closePopup;
}

editButton.addEventListener('click', editProfile);
form.addEventListener('submit', submitProfile);
closeButton.addEventListener('click', closePopup)