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