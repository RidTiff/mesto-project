import { Popup } from "./popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
      super(selector);
      this._image = this._popup.querySelector('.popup__image');
      this._caption = this._popup.querySelector('.popup__caption')
    }
    
    open(image, caption) {
      super.open();
      this._image.setAttribute('src', image);
      this._image.setAttribute('alt', caption);
      this._caption.textContent = caption;
    }
  }