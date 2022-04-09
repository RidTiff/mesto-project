//API Класс
export class Api {
    constructor(options) {
      this.host = options.host;
      this.authorization = options.authorization;
    }

    checkResponse (res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }

    getUser() {
        return fetch(`${this.host}/users/me`, {
            headers: {
                authorization: this.authorization
            }
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
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        .then((res) => this.checkResponse (res))
    }

    patchAvatar(avatar) {
        return fetch(`${this.host}/users/me/avatar`, {
            method: 'PATCH',
            body: JSON.stringify ({
                avatar: avatar
            }),
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        .then((res) => this.checkResponse (res))
    }

    getCards(user) {
        return fetch(`${this.host}/cards`, {
            headers: {
                authorization: this.authorization
            }
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
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        .then((res) => this.checkResponse (res))
    }

    deleteCard(evt, id) {
        return fetch(`${this.host}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.authorization
            }
        })
        .then((res) => this.checkResponse (res))
    }

    putLike(id) {
        return fetch(`${this.host}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this.authorization
            }
        })
        .then((res) => this.checkResponse (res))
    }

    deleteLike(id) {
        return fetch(`${this.host}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.authorization
            }
        })
        .then((res) => this.checkResponse (res))
    }

}