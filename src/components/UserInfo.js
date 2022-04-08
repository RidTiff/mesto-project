//Oтвечает за управление информацией о пользователе на странице
export class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.nameSlector);
    this._description = document.querySelector(data.descriptionSlector);
  }
  //Метод возвращает объект с данными пользователя
  getUserInfo(api) {
    const res = {};
    api.getUser().then((user) => {
      res.name = user.name;
      res.about = user.about;
    });
    return res;
  }
  //Принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
  setUserInfo(name, about, api) {
    //Принимает новые значения
    api.patchProfile(name, about).then((user) => {
      console.log(user);
      this._name.textContent = user.name;
      this._description.textContent = user.about;
    });
  }
}
