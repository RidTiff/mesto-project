//Формы

const checkInputValidity = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add('popup__input-error_active');
  } else {
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some ((input) => {
    return !input.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_inactive');
  } else {
    buttonElement.classList.remove('popup__submit_inactive');
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  
  const formList = document.querySelectorAll('.popup__form');
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
  });

  setEventListeners(formElement);
  });
};