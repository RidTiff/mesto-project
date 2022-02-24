//Попап


//Открытие popup



export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape); 
}
  
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}

// Закрытие попапов

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export const popupInteraction = () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach( function (item) {
    item.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup__close')) {
        closePopup(item);
      } else if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
      }
    })
  })
}

