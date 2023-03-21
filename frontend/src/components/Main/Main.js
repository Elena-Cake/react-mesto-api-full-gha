import React from "react";
import Card from '../Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const cardsElements = props.cards.map((card) => (
        <Card key={card._id} card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete} />
    ))

    return (
        <main className="main">
            <section className="profile">
                <button onClick={props.onEditAvatar} className="profile__btn-avatar"></button>
                <img className="profile__avatar" alt="аватар пользователя" src={currentUser.avatar} />
                <div className="profile__container">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__job">{currentUser.about}</p>
                    <button onClick={props.onEditProfile} className="profile__btn-edit"
                        type="button" aria-label="открыть окно редактирования профиля"></button>
                </div>
                <button onClick={props.onAddPlace} className="profile__btn-add"
                    type="button" aria-label="добавить место"></button>
            </section>
            <section className="elements" aria-label="Фотографии">
                {cardsElements}
            </section>
        </main>
    )
}

export default Main;