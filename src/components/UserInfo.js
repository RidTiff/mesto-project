//Oтвечает за управление информацией о пользователе на странице
export class UserInfo {
  constructor({ name, description, avatarElement }) {
    this._name = name;
    this._description = description;
    this._avatarElement = avatarElement;
  }

  //Метод возвращает объект с данными пользователя
  getUserInfo() {
    return {
      // Возвращает значения из разметки(профиля)
      name: this._name.textContent,
      about: this._description.textContent,
    };
  }

  //Принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
  setUserInfo = ({ name, about }) => {
    //Принимает новые значения
    this._name = name;
    this._about = about;
    this._name.textContent = this._name;
    this._description.textContent = this._about;
  };

  setUserAvatar = ({ avatar }) => {
    this._avatar = avatar;
    this._avatarElement.src = this._avatar;
  };
}
