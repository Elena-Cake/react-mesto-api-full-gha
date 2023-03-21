
import { useFormAndValidation } from '../../hooks/useValidationForm'

function AuthForm({ title, buttonText, onSubmit }) {

    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(values.password, values.email)
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h1 className="form__title">{title}</h1>
            <label className='form__label'>
                <input className="form__input"
                    placeholder="Email" type="email" name="email"
                    value={values.email || ''} onChange={handleChange}
                    minLength="2" required />
                <span className={`form__error ${errors.email ? 'form__error_type_active' : ''}`}>{errors.email}</span>
            </label>
            <label className='form__label'>
                <input className="form__input" placeholder="Пароль"
                    type="password" value={values.password || ''} name="password"
                    onChange={handleChange} minLength="4" required />
                <span className={`form__error ${errors.password ? 'form__error_type_active' : ''}`}>{errors.password}</span>
            </label>
            <button className="form__btn-save" disabled={!isValid}>{buttonText}</button>
        </form>
    )
}

export default AuthForm;