//___________________________________
//  ЗАПРОСЫ СЕРВЕРУ
//___________________________________

class Api {
    constructor({ baseUrl, headers }) {
        this._startRequest = baseUrl
        this._headers = headers

        this._checkRes = (res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
        };
    }

    // загрузка данных пользователя
    startPageProfile() {
        return fetch(`${this._startRequest}users/me`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkRes)
    }

    // запрос карточек с сервера
    startPageCards() {
        return fetch(`${this._startRequest}cards`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkRes)
    }

    // изменение профайла
    editUserInfo(dataUser) {
        console.log(dataUser)
        return fetch(`${this._startRequest}users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUser)
        })
            .then(this._checkRes)
    }

    // изменение аватара в профиле
    editUserAvatar(avatar) {
        return fetch(`${this._startRequest}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(avatar)
        })
            .then(this._checkRes)
    }

    // сохранить карточку
    sendCard = (dataCard) => {
        return fetch(`${this._startRequest}cards`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataCard)
        })
            .then(this._checkRes)
    }

    // удалить карточку
    deleteCard = (idCard) => {
        return fetch(`${this._startRequest}cards/${idCard}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkRes)
    }

    // поставить лайк
    sendLike = (idCard) => {
        return fetch(`${this._startRequest}cards/${idCard}/likes`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkRes)
    }

    // удалить лайк
    deleteLike = (idCard) => {
        return fetch(`${this._startRequest}cards/${idCard}/likes`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkRes)
    }
}

export const api = new Api({
    // baseUrl: 'https://api.svesha.nomoredomains.work/',
    baseUrl: 'http://localhost:3000/',
})
