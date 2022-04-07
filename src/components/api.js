import { renderProfile, renderAvatar, formProfile } from './profile';

//API Класс
export class Api {
  constructor(options) {
    this.host = options.host;
    this.authorization = options.authorization;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUser() {
    // return fetch(this.host, {
    return fetch(`${this.host}/users/me`, {
      headers: {
        authorization: this.authorization,
      },
    }).then((res) => this.checkResponse(res));
  }

  patchProfile(name, about) {
    // return fetch(this.host, {
    return fetch(`${this.host}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about,
      }),
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => this.checkResponse(res))
      .then((result) => {
        renderProfile(result.name, result.about);
      });
  }

  patchAvatar(avatar) {
    return fetch(`${this.host}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar,
      }),
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => this.checkResponse(res))
      .then((result) => {
        renderAvatar(result.avatar);
      });
  }

  // getCards(user) {
  getCards() {
    return fetch(`${this.host}/cards`, {
      headers: {
        authorization: this.authorization,
      },
    }).then((res) => this.checkResponse(res));
    //       .then((cards) => {
    //         cards.forEach((element) => {
    //           const userId = user._id;
    //           let deleteCard = false;
    //           let checkLike = false;
    //           if (element.owner._id == userId) {
    //             deleteCard = true;
    //           }
    //           for (let i = 0; i < element.likes.length; i++) {
    //             if (element.likes[i]._id == userId) {
    //               checkLike = true;
    //               break;
    //             }
    //           }
    //
    //           showCard(
    //             element.name,
    //             element.link,
    //             deleteCard,
    //             element.likes.length,
    //             checkLike,
    //             element._id
    //           );
    //         });
    //       });
  }

  postCard(name, link) {
    return fetch(`${this.host}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => this.checkResponse(res))
      .then((result) => {
        showCard(result.name, result.link, true, 0, false, result._id);
      });
  }

  deleteCard(evt, id) {
    return fetch(`${this.host}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
      },
    })
      .then((res) => this.checkResponse(res))
      .then(() => {
        evt.target.closest('.card').remove();
      });
  }

  putLike(id, countElement) {
    return fetch(`${this.host}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this.authorization,
      },
    })
      .then((res) => this.checkResponse(res))
      .then((result) => {
        renderLikes(countElement, result.likes.length);
      });
  }

  deleteLike(id, countElement) {
    return fetch(`${this.host}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
      },
    })
      .then((res) => this.checkResponse(res))
      .then((result) => {
        renderLikes(countElement, result.likes.length);
      });
  }
}
