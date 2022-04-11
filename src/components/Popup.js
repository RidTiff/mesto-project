//Попап

export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
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
    }); 
  }

  _handleEscClose(evt, popup) {
    if (evt.key === 'Escape') {
      this.close.bind(popup)();
    }
  }

  setEventListener() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      } else if (evt.target.classList.contains('popup')) {
        this.close();
      }
    })
  }
}
