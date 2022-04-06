//Формы
import {FormValidator} from "./FormValidator.js";

/*const checkInputValidity = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(settings.errorClass);
  } else {
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some ((input) => {
    return !input.validity.valid;
  })
}

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}*/

export const enableValidation = (settings = {}) => {
  
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(settings,formElement);
    formValidator.enableValidation();
  });
};

export function renderLoading(form, isLoading) {
  const button = form.querySelector('.popup__submit')
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}