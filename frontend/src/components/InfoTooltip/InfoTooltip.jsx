function InfoTooltip({ isOpen, isSignIn, onClose, text, imageType }) {
    const className = `popup popup-status ${isOpen ? 'popup_opened' : ''}`
    return (
        <div className={className}>
            <div className="popup__container">
                <button onClick={onClose} className="popup__btn-close" type="button" aria-label="закрыть окно"></button>
                <div className="popup__form">
                    <div className={`popup__status-img popup__status-img_type_${imageType}`}>
                    </div>
                    <p className="popup__status-text" >
                        {text}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;