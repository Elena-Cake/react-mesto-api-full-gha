function ImagePopup({ isOpen, card, onClose }) {
    return (
        <div className={`popup popup-foto ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_place_foto">
                <img className="popup__foto" src={card.link} alt={card.name} />
                <button onClick={onClose} className="popup__btn-close" type="button" aria-label="закрыть окно"></button>
                <h3 className="popup__name">{card.name}</h3>
            </div>
        </div>
    )
}

export default ImagePopup;