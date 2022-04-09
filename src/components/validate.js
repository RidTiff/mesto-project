//Формы
import {FormValidator} from "./FormValidator.js";


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