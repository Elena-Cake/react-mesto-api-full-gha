import React from 'react';
import { useState, useEffect } from 'react';

import '../index.css';

import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './Header/Header'
import Main from './Main/Main'
import Register from './Register/Register'
import Login from './Login/Login'
import Footer from './Footer/Footer'

import EditProfilePopup from './EditProfilePopup/EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup/AddPlacePopup '

import { api } from '../utils/api'
import ImagePopup from './ImagePopup/ImagePopup'

import InfoTooltip from './InfoTooltip/InfoTooltip';

import ConfirmationPopup from './ConfirmationPopup/ConfirmationPopup'

import { CurrentUserContext } from '../contexts/CurrentUserContext'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { register, login, checkToken } from "../utils/auth";

function App() {

    // авторизация и вход
    const [isSignIn, setIsSignIn] = useState(false);
    const navigate = useNavigate();
    const [emailUser, setEmailUser] = useState("");
    const [infoToolText, setInfoToolText] = useState("");
    const [infoToolImageType, setInfoToolImageType] = useState("err");
    const [isShowUser, setIsShowUser] = useState(false);
    const jwt = localStorage.getItem('jwt');

    // открытие попапов
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isOpenCardPopup, setIsOpenCardPopup] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isOpenConfirmationPopup, setIsOpenConfirmationPopup] = useState(false);

    // данные профиля
    const [currentUser, setCurrentUser] = useState({});

    // данные карточек
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [idSelectedCard, setIdSelectedCars] = useState('')

    // загрузка данных
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(false)
    const [isLoadingAddPlace, setIsLoadingPlace] = useState(false)
    const [isLoadingProfile, setIsLoadingProfile] = useState(false)
    const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false)

    // отображение бургера
    const openMenu = (e) => {
        e.preventDefault()
        setIsShowUser(true)
    };
    const hideMenu = (e) => {
        e.preventDefault()
        setIsShowUser(false)
    };

    // ошибка для InfoTooltip
    function appointErrInfoTool() {
        setInfoToolText("Что-то пошло не так! Попробуйте ещё раз.")
        setInfoToolImageType('err')
    }

    // регистрация
    function handleRegisterClick(password, email) {
        register({ password, email })
            .then((res) => {
                if (res) {
                    setIsSignIn(true)
                    setInfoToolText('Вы успешно зарегистрировались!')
                    setInfoToolImageType('ok')
                }
            })
            .then(() => {
                handleLoginClick(password, email)
            })
            .catch(() => {
                setIsSignIn(false)
                appointErrInfoTool()
            })
            .finally(() => setIsInfoTooltipOpen(true))
    }

    // авторизация
    function handleLoginClick(password, email) {
        login({ password, email })
            .then((data) => {
                localStorage.setItem("jwt", data.token);
                setIsSignIn(true);
                setInfoToolText('Успешно!')
                setInfoToolImageType('ok')
                navigate('/', { replace: true });
                setEmailUser(email)
            })
            .then(() => pullInitialData())
            .catch((res) => {
                setIsInfoTooltipOpen(true);
                setIsSignIn(false);
                appointErrInfoTool()
            })
            .finally(() => setIsInfoTooltipOpen(true))
    }

    // проверка токена
    useEffect(() => {
        if (jwt) {
            checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setIsSignIn(true);
                        setEmailUser(res.email)
                        pullInitialData()
                        navigate("/", { replace: true })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [])

    // удаление токена при выходе из аккаунта
    function signOut(e) {
        e.preventDefault();
        localStorage.removeItem("jwt");
        navigate("/sign-in", { replace: false })
    }

    // загрузка профиля и карточек при старте страницы
    useEffect(() => {
        if (isSignIn) {
            pullInitialData()
        }
    }, [isSignIn]);

    const pullInitialData = () => {
        Promise.all([api.startPageCards(), api.startPageProfile()])
            .then(([cards, user]) => {
                setCurrentUser(user)
                setCards(cards)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // зум карточки
    function handleCardClick(card) {
        setIsOpenCardPopup(true)
        setSelectedCard(card)
    }

    // открытие попапов
    function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true) }
    function handleEditProfileClick() { setIsEditProfilePopupOpen(true) }
    function handleAddPlaceClick() { setIsAddPlacePopupOpen(true) }

    // закрытие попапов
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsOpenCardPopup(false)
        setIsOpenConfirmationPopup(false)
        setIsInfoTooltipOpen(false)
    }

    // лайк карточки
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        console.log()
        const isLiked = card.likes.some(_id => _id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        !isLiked ?
            //поставить лайк
            api.sendLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => {
                    console.log(err);
                })
            :
            //убрать лайк
            api.deleteLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => {
                    console.log(err);
                })
    }

    // удаление карточки - нажатие корзины
    function handleCardDelete(idCard) {
        setIdSelectedCars(idCard)
        setIsOpenConfirmationPopup(true)
    }

    // удаление карточки - запрос после подтверждения
    function handleConfirmationDelete() {
        setIsLoadingConfirmation(true)
        api.deleteCard(idSelectedCard)
            .then(() => {
                setCards((state) => state.filter(card => card._id !== idSelectedCard))
                setIsLoadingConfirmation(false)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // обновление профиля
    function handleUpdateUser({ values, resetForm }) {
        setIsLoadingProfile(true)
        api.editUserInfo(values)
            .then((user) => {
                console.log(user)
                setCurrentUser(user.data)
                setIsLoadingProfile(false)
                closeAllPopups();
                resetForm()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // обновление аватара
    function handleUpdateAvatar({ values, resetForm }) {
        setIsLoadingAvatar(true)
        api.editUserAvatar(values)
            .then((user) => {
                console.log(user)
                setCurrentUser(user)
                setIsLoadingAvatar(false)
                closeAllPopups()
                resetForm()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // добавление карточки
    function handleAddPlaceSubmit({ values, resetForm }) {
        setIsLoadingPlace(true)
        api.sendCard(values)
            .then((card) => {
                setCards([card, ...cards]);
                setIsLoadingPlace(false)
                closeAllPopups()
                resetForm()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (

        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header emailUser={emailUser} signOut={signOut} showUser={isShowUser}
                    openMenu={openMenu} hideMenu={hideMenu} />

                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute
                            component={Main} isSignIn={isSignIn}
                            onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick} onClose={closeAllPopups}

                            onCardClick={handleCardClick} onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            cards={cards}
                        />} />
                    <Route path="/sign-up" element={<Register register={handleRegisterClick} />} />
                    <Route path="/sign-in" element={<Login login={handleLoginClick} />} />
                </Routes>

                <Footer />

                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    isSignIn={isSignIn}
                    text={infoToolText}
                    imageType={infoToolImageType} />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoadingAvatar} />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoadingProfile} />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoadingAddPlace} />

                <ImagePopup
                    isOpen={isOpenCardPopup}
                    onClose={closeAllPopups}
                    card={selectedCard} />

                <ConfirmationPopup
                    isOpen={isOpenConfirmationPopup}
                    onClose={closeAllPopups}
                    onConfirmationSubmit={handleConfirmationDelete}
                    isLoading={isLoadingConfirmation} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
