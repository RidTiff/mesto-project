export class FormValidator {
    constructor(settings, formElement){
        this._element = formElement;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this.inputErrorClass = settings.inputErrorClass;
        this.errorClass = settings.errorClass;
    }

    enableValidation() {
      this._element.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });

    this._setEventListeners();
    }

    _setEventListeners = () => {
        const inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
        const buttonElement = this._element.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
      
        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', function () {
            this._checkInputValidity(inputElement);
            this._toggleButtonState(inputList, buttonElement);
          });
        });
      };

      _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._inactiveButtonClass);
          buttonElement.setAttribute('disabled', true);
        } else {
          buttonElement.classList.remove(this._inactiveButtonClass);
          buttonElement.removeAttribute('disabled');
        }
      }

      _hasInvalidInput = (inputList) => {
        return inputList.some ((input) => {
          return !input.validity.valid;
        })
      }

      _checkInputValidity = (inputElement) => {
        const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
          inputElement.classList.add(this.inputErrorClass);
          errorElement.textContent = inputElement.validationMessage;
          errorElement.classList.add(this.errorClass);
        } else {
          inputElement.classList.remove(this.inputErrorClass);
          errorElement.classList.remove(this.errorClass);
          errorElement.textContent = '';
        }
      };
}