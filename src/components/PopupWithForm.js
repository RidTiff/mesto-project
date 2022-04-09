import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._values = {};
    this._popup.querySelectorAll('.popup__input').forEach((input) => {
      const name = input.name;
      this._values[name] = input.value;
    });
    return this._values;
  }

  _setEventListener() {
    super._setEventListener(this);
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener("submit", (evt) => {
      this._callback(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}