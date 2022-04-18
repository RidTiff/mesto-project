import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._form = this._popup.querySelector('.popup__form');
    this._submitBtn = this._popup.querySelector('.popup__submit');
  }

  toggleSaveBtnCaption(caption){
    this._submitBtn.textContent = caption;
  }

  _getInputValues() {
    this._values = {};
    this._popup.querySelectorAll('.popup__input').forEach((input) => {
      const name = input.name;
      this._values[name] = input.value;
    });
    return this._values;
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener("submit", () => {
      this._callback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}