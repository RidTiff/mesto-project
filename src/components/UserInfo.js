//Oтвечает за управление информацией о пользователе на странице
export class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.nameSelector);
    this._description = document.querySelector(data.descriptionSelector);
    this._avatar = document.querySelector(data.avatarSelector)
  }

  //Метод возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._description.textContent,
      avatar: this._avatar
    };
  }

  //Принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
  setUserInfo (user) {
      this._name.textContent = user.name;
      this._description.textContent = user.about;
      this._avatar.setAttribute('src', user.avatar);
  };
}
