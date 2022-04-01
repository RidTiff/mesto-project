import { renderProfile, renderAvatar, formProfile } from './profile';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6/',
  headers: {
    authorization: 'a5873ca2-eb5b-4cfd-9dad-a8ba3d811b6c',
    'Content-Type': 'application/json',
  },
};

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

export function patchProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => checkResponse(res))
    .then((result) => {
      renderProfile(result.name, result.about);
    });
}

export function patchAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then((res) => checkResponse(res))
    .then((result) => {
      renderAvatar(result.avatar);
    });
}

import { showCard, renderLikes } from './card';

export function getCards(user) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => checkResponse(res))
    .then((cards) => {
      cards.forEach((element) => {
        const userId = user._id;
        let deleteCard = false;
        let checkLike = false;
        if (element.owner._id == userId) {
          deleteCard = true;
        }
        for (let i = 0; i < element.likes.length; i++) {
          if (element.likes[i]._id == userId) {
            checkLike = true;
            break;
          }
        }

        showCard(
          element.name,
          element.link,
          deleteCard,
          element.likes.length,
          checkLike,
          element._id
        );
      });
    });
}

export function postCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => checkResponse(res))
    .then((result) => {
      showCard(result.name, result.link, true, 0, false, result._id);
    });
}

export function deleteCard(evt, id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => checkResponse(res))
    .then(() => {
      evt.target.closest('.card').remove();
    });
}

export function putLike(id, countElement) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((res) => checkResponse(res))
    .then((result) => {
      renderLikes(countElement, result.likes.length);
    });
}

export function deleteLike(id, countElement) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => checkResponse(res))
    .then((result) => {
      renderLikes(countElement, result.likes.length);
    });
}
