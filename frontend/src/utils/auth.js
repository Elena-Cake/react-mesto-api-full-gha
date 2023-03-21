export const BASE_URL = 'http://api.svesha.nomoredomains.work/';

function checkResponse(res) {
    if (res.ok) {
        return res.json();

    }
    return Promise.reject(`Ошибка ${res.status}`);
}

// запрос регистрации
export const register = (dataUser) => {
    return fetch(`${BASE_URL}signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataUser)
    })
        .then((res) => {
            return checkResponse(res)
        })
};

// запрос авторизации
export const login = (dataUser) => {
    return fetch(`${BASE_URL}signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataUser)
    })
        .then((res) => {
            return checkResponse(res)
        })
};

// проверка токена при загрузке страницы
export const checkToken = (token) => {
    return fetch(`${BASE_URL}users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((res) => {
            return checkResponse(res)
        })

}