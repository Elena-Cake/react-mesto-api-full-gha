import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

import { useFormAndValidation } from '../../hooks/useValidationForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation()

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(
      {
        values: values,
        resetForm: resetForm,
      },
    );
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onClose={onClose}
      onSubmit={handleSubmit}
      name="avatar" title={"Обновить аватар"}
      buttonText={!isLoading ? "Создать" : "Создание..."}
      disabledButton={!isValid}
    >
      <fieldset className="popup__set">
        <label className="popup__form-field">
          <input
            value={values.avatar || ''}
            onChange={handleChange}
            className="popup__input popup__input_type_name"
            id="avatar-input" name="avatar"
            type="url" placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error url-input-error popup__input-error_active">
            {errors.avatar}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
