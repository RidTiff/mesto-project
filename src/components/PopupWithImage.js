import { Popup } from "./popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
      super(selector);
    }
  
    open(image, caption) {
      super.open();
      this._popup.querySelector('.popup__image')
      this._popup.querySelector('.popup__image').setAttribute('src', image);
      this._popup.querySelector('.popup__caption').textContent = caption;
    }
  }