//Попап

export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._setEventListener(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt, this);
    }); 
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', (evt) => {
      this._handleEscClose(evt, this);
      this._setEventListener(this);
    }); 
  }

  _handleEscClose(evt, popup) {
    if (evt.key === 'Escape') {
      this.close.bind(popup)();
    }
  }

  _setEventListener(popup) {
    this._popup.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup__close')) {
        popup.close();
      } else if (evt.target.classList.contains('popup')) {
        popup.close();
      }
    })
  }
}