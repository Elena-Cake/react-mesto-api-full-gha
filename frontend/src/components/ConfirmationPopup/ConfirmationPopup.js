import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function ConfirmationPopup({ isOpen, onClose, onConfirmationSubmit, isLoading }) {

    function handleSubmit(e) {
        e.preventDefault();

        onConfirmationSubmit();
    }

    return (
        <PopupWithForm
            isOpen={isOpen} onClose={onClose}
            onSubmit={handleSubmit}
            name="deleteCard" title={"Вы уверены?"}
            buttonText={!isLoading ? "Да" : "Удаление..."}
            disabledButton={false}
        >
        </PopupWithForm>
    )
}

export default ConfirmationPopup;