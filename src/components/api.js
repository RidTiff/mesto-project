import { renderProfile, renderAvatar, formProfile } from "./profile";

function checkResponse (res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

export function getUser() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-6/users/me', {
        headers: {
            authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c'
        }
    })
    .then((res) => checkResponse (res))
}

export function patchProfile(name, about) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-6/users/me', {
        method: 'PATCH',
        body: JSON.stringify ({
            name: name,
            about: about
        }),
        headers: {
            authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then((res) => checkResponse (res))
    .then((result) => {
        renderProfile(result.name, result.about);
    })
}

export function patchAvatar(avatar) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-6/users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify ({
            avatar: avatar
        }),
        headers: {
            authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then((res) => checkResponse (res))
    .then((result) => {
        renderAvatar(result.avatar);
    })
}

import { showCard, renderLikes } from "./card";

export function getCards(user) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-6/cards', {
        headers: {
            authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c'
        }
    })
    .then((res) => checkResponse (res))
    .then((cards) => {
        cards.forEach(element => {
            const userId = user._id;
            let deleteCard = false;
            let checkLike = false;
            if (element.owner._id == userId) {
                deleteCard = true;
            }
            for (let i = 0; i < element.likes.length; i++) {
                if (element.likes[i]._id == userId) {
                    checkLike = true;
                    break
                }
            };

            showCard(element.name, element.link, deleteCard, element.likes.length, checkLike, element._id);
        });
    })
}

export function postCard(name, link) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-6/cards', {
        method: 'POST',
        body: JSON.stringify ({
            name: name,
            link: link
        }),
        headers: {
            authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then((res) => checkResponse (res))
    .then((result) => {
        showCard(result.name, result.link, true, 0, false, result._id);
    })
}

export function deleteCard(evt, id) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-6/cards/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c'
        }
    })
    .then((res) => checkResponse (res))
    .then(() => {
        evt.target.closest('.card').remove()
    })
}


export function putLike(id, countElement) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-6/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
            authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c'
        }
    })
    .then((res) => checkResponse (res))
    .then((result) => {
        renderLikes(countElement, result.likes.length);
    })
}

export function deleteLike(id, countElement) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-6/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c'
        }
    })
    .then((res) => checkResponse (res))
    .then((result) => {
        renderLikes(countElement, result.likes.length);
    })
}


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
        return fetch(this.host, {
            headers: {
                authorization: this.authorization
            }
        })
        .then((res) => checkResponse (res))
    }

    patchProfile(name, about) {
        return fetch(this.host, {
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
        .then((res) => checkResponse (res))
        .then((result) => {
            renderProfile(result.name, result.about);
        })
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
        .then((res) => checkResponse (res))
        .then((result) => {
            renderAvatar(result.avatar);
        })
    }

    getCards(user) {
        return fetch(`${this.host}/cards`, {
            headers: {
                authorization: this.authorization
            }
        })
        .then((res) => checkResponse (res))
        .then((cards) => {
            cards.forEach(element => {
                const userId = user._id;
                let deleteCard = false;
                let checkLike = false;
                if (element.owner._id == userId) {
                    deleteCard = true;
                }
                for (let i = 0; i < element.likes.length; i++) {
                    if (element.likes[i]._id == userId) {
                        checkLike = true;
                        break
                    }
                };
    
                showCard(element.name, element.link, deleteCard, element.likes.length, checkLike, element._id);
            });
        })
    }

    postCard(name, link) {
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
        .then((res) => checkResponse (res))
        .then((result) => {
            showCard(result.name, result.link, true, 0, false, result._id);
        })
    }

    deleteCard(evt, id) {
        return fetch(`${this.host}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.authorization
            }
        })
        .then((res) => checkResponse (res))
        .then(() => {
            evt.target.closest('.card').remove()
        })
    }

    putLike(id, countElement) {
        return fetch(`${this.host}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this.authorization
            }
        })
        .then((res) => checkResponse (res))
        .then((result) => {
            renderLikes(countElement, result.likes.length);
        })
    }

    deleteLike(id, countElement) {
        return fetch(`${this.host}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.authorization
            }
        })
        .then((res) => checkResponse (res))
        .then((result) => {
            renderLikes(countElement, result.likes.length);
        })

}