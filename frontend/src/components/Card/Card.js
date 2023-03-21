import React from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__btn-like ${isLiked && 'element__btn-like_active'}`
    );

    function handleCardClick() {
        // передается через мэйн из апп
        onCardClick(card);
    }

    function handleCardLike() {
        // передается через мэйн из апп
        onCardLike(card);
    }

    function handleCardDelete() {
        // передается через мэйн из апп
        onCardDelete(card._id);
    }

    return (
        <div className="element">
            <img className="element__foto" src={card.link} alt={card.name}
                onClick={handleCardClick} />
            {isOwn && <button className="element__btn-trash" type="button" aria-label="Удалить" onClick={handleCardDelete}></button>}
            <div className="element__discription">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-group">
                    <button className={cardLikeButtonClassName} type="button" aria-label="Лайк"
                        onClick={handleCardLike}></button>
                    <p className="element__counter">{card.likes.length > 0 ? card.likes.length : ''}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;