//API Класс
export class Api {
    constructor(options) {
      this.host = options.host;
      this._headers = options.headers
    }

    checkResponse (res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }

    getUser() {
        return fetch(`${this.host}/users/me`, {
            headers: this._headers
        })
        .then((res) => this.checkResponse (res))
    }

    patchProfile(name, about) {
        return fetch(`${this.host}/users/me`, {
            method: 'PATCH',
            body: JSON.stringify ({
                name: name,
                about: about
            }),
            headers: this._headers
        })
        .then((res) => this.checkResponse (res))
    }

    patchAvatar(avatar) {
        return fetch(`${this.host}/users/me/avatar`, {
            method: 'PATCH',
            body: JSON.stringify ({
                avatar: avatar
            }),
            headers: this._headers
        })
        .then((res) => this.checkResponse (res))
    }

    getCards(user) {
        return fetch(`${this.host}/cards`, {
            headers: this._headers
        })
        .then((res) => this.checkResponse (res))
    }

    postCard(name,link) {
        return fetch(`${this.host}/cards`, {
            method: 'POST',
            body: JSON.stringify ({
                name: name,
                link: link
            }),
            headers: this._headers
        })
        .then((res) => this.checkResponse (res))
    }

    deleteCard(id) {
        return fetch(`${this.host}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => this.checkResponse (res))
    }

    putLike(id) {
        return fetch(`${this.host}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then((res) => this.checkResponse (res))
    }

    deleteLike(id) {
        return fetch(`${this.host}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => this.checkResponse (res))
    }

}
