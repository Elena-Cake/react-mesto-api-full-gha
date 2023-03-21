import React from "react";
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useFormAndValidation } from '../../hooks/useValidationForm'

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation()

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace(
            {
                values: values,
                resetForm: resetForm,
            },
        );
    }

    return (
        <PopupWithForm
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}
            name='add-card' title={"Новое место"}
            buttonText={!isLoading ? "Создать" : "Создание..."}
            disabledButton={!isValid}
            resetForm={resetForm}>
            <fieldset className="popup__set">
                <label className="popup__form-field">
                    <input
                        value={values.name || ''} onChange={handleChange}
                        className="popup__input popup__input_type_name" id="place-input" type="text"
                        name="name" placeholder="Название" required minLength="2" maxLength="30" />
                    <span className="popup__input-error place-input-error popup__input-error_active">{errors.name}</span>
                </label>
                <label className="popup__form-field">
                    <input
                        value={values.link || ''} onChange={handleChange}
                        className="popup__input popup__input_type_job" id="url-input" type="url"
                        name="link" placeholder="Ссылка на картинку" required />
                    <span className="popup__input-error url-input-error popup__input-error_active">{errors.link}</span>
                </label>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;