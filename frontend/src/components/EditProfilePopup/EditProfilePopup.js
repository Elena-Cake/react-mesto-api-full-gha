import React from "react";
import { useContext, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from '../../hooks/useValidationForm'


function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation();

  const currentUserData = useContext(CurrentUserContext);
  //заполненные поля при открытии
  useEffect(() => {
    if (Object.keys(currentUserData).length !== 0) {
      setValues({ ...values, 'name': currentUserData.name, 'about': currentUserData.about })
      setIsValid(true)
    }
  }, [currentUserData, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(
      {
        values: values,
        resetForm: resetForm,
      }
    );
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}
      name="edit" title={"Редактировать профиль"}
      buttonText={!isLoading ? "Создать" : "Создание..."}
      disabledButton={!isValid} resetForm={resetForm}
    >
      <fieldset className="popup__set">
        <label className="popup__form-field">
          <input
            value={values.name || ''} onChange={handleChange}
            className="popup__input popup__input_type_name"
            id="place-input" type="text" name="name"
            required
            minLength="2" maxLength="40"
            placeholder="Введите имя"
          />
          <span className="popup__input-error place-input-error popup__input-error_active">
            {errors.name}
          </span>

        </label>
        <label className="popup__form-field">
          <input
            value={values.about || ''} onChange={handleChange}
            className="popup__input popup__input_type_job"
            id="job-input" type="text" name="about"
            required
            minLength="2" maxLength="200"
            placeholder="Чем вы занимаетесь?"
          />
          <span className="popup__input-error url-input-error popup__input-error_active">
            {errors.about}
          </span>

        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
