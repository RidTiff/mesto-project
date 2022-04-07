//Попап

export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(`${selector}`);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt, this);
      this._setEventListener(this);
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
    this._popup.querySelector('.popup__image').setAttribute('src', image);
    this._popup.querySelector('.popup__caption').textContent = caption;
    super.open()
  }
}

export class PopupWithForm extends Popup {
  constructor(selector, form, callback) {
    super(selector);
    this._form = form;
    this._callback = callback;
  }

  _getInputValues() {
    this._values = {};
    this._popup.querySelectorAll('.popup__input').forEach((input) => {
      const name = input.name;
      this._values[name] = input.value;
    }).bind(this);
    return this._values;
  }

  _setEventListener(form) {
    super(this);
    
    this._form.addEventListener('submit', form._callback);
  }

  close() {
    super();
    this._form.reset();
  }
}