//Попап


//Открытие popup

export function openForm(popup) {
    popup.classList.add('popup_opened');
  }
  
export function closeForm(popup) {
  popup.classList.remove('popup_opened');
}

// Закрытие попапов



export const popupInteraction = () => {
    const popup = document.querySelectorAll('.popup');
    popup.forEach( function (item) {
        item.addEventListener('click', function (evt) {
          if (evt.target.classList.contains('popup__close')) {
            closeForm(evt.target.parentElement.parentElement);
          } else if (evt.target.classList.contains('popup')) {
            closeForm(evt.target);
          }
        })

        document.addEventListener('keydown', function (evt) {
        if (evt.key == 'Escape') {
          closeForm(item);
        };
      })
    })
}

