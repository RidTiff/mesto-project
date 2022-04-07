// Отвечает за управление информацией о пользователе на странице
export class UserInfo {
  constructor({ profileTitle, profileJob, profileAvatar }) {
    this._profileTitle = document.querySelector(profileTitle);
    this._profileJob = document.querySelector(profileJob);
    this._profileAvatar = document.querySelector(profileAvatar);
    // this._profileTitle = profileTitle;
    // this._profileJob = profileJob;
    // this._profileAvatar = profileAvatar;
  }

  //Метод возвращает объект с данными пользователя
  getUserInfo() {
    return {
      // Возвращает значения из разметки(профиля)
      name: this._profileTitle.textContent,
      about: this._profileJob.textContent,
    };
  }

  //Метод принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
  setUserInfo = ({ name, about }) => {
    //Принимает новые значения
    this._name = name;
    this._about = about;
    this._profileTitle.textContent = this._name;
    this._profileJob.textContent = this._about;
  };

  setUserAvatar = ({ avatar }) => {
    this._avatar = avatar;
    this._profileAvatar.src = this._avatar;
  };
}
