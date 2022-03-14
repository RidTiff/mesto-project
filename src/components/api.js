import { renderProfile, renderAvatar } from "./profile";

export function getUser(avatar) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-6/users/me', {
        headers: {
            authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c'
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then((result) => {
        renderProfile(result.name, result.about);
        avatar.src = result.avatar;
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
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
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then((result) => {
        renderProfile(result.name, result.about);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
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
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then((result) => {
        renderAvatar(result.avatar);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
}

import { showCard, renderLikes } from "./card";

export function getCards() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-6/cards', {
        headers: {
            authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c'
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then((result) => {
        result.forEach(element => {
            let deleteCard;
            if (element.owner._id == 'e3a866676e6e0a34dd6c60a8') {
                deleteCard = true;
            } else {
                deleteCard = false;
            }
            showCard(element.name, element.link, deleteCard, element.likes.length, element._id);
        });
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
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
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then((result) => {
        showCard(result.name, result.link, true, 0, result._id);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
}

export function deleteCard(evt, id) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-6/cards/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c'
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then(() => {
        evt.target.closest('.card').remove()
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
}


export function putLike(id, countElement) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-6/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
            authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c'
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then((result) => {
        renderLikes(countElement, result.likes.length);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
}

export function deleteLike(id, countElement) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-6/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c'
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then((result) => {
        renderLikes(countElement, result.likes.length);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
}