import { Popup } from "./popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
      super(selector);
      this._image = this._popup.querySelector('.popup__image')
    }
    
    open(image, caption) {
      super.open();
      this._image.setAttribute('src', image);
      this._image.setAttribute('alt', caption);
      this._popup.querySelector('.popup__caption').textContent = caption;
    }
  }