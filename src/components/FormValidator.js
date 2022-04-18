export class FormValidator {
  constructor(settings, formElement){
      this._element = formElement;
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this.inputErrorClass = settings.inputErrorClass;
      this.errorClass = settings.errorClass;
      this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
      this._buttonElement = this._element.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._element.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  resetValidation() {
    this._disabledButton()

    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }

  _disabledButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  _undisabledButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  _hideError(inputElement) {
    const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  }

  _showError(inputElement) {
    const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.errorClass);
  }

  _setEventListeners() {
      this._toggleButtonState();
    
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disabledButton()
    } else {
      this._undisabledButton()
    }
  }

  _hasInvalidInput() {
    return this._inputList.some ((input) => {
      return !input.validity.valid;
    })
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showError(inputElement)
    } else {
      this._hideError(inputElement)
    }
  }
}