
function PopupWithForm(props) {
    const className = `popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`
    return (
        <div className={className}>
            <div className="popup__container">
                <button onClick={props.onClose}
                    className="popup__btn-close"
                    type="button"
                    aria-label="закрыть окно">
                </button>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
                    <h3 className="popup__title">{props.title}</h3>
                    {props.children}
                    <button disabled={props.disabledButton}
                        className={`popup__btn-save ${props.disabledButton ? 'btn-save_inactive' : ''}`}
                        type="submit">{props.buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;

