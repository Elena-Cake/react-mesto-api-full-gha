
import { NavLink } from "react-router-dom";
import AuthForm from '../AuthForm/AuthForm';

function Register({ register }) {

    return (
        <div className="register">
            <AuthForm title='Регистрация' buttonText='Зарегистрироваться' onSubmit={register} />
            <NavLink to="/sign-in" className="register__link">
                Уже зарегистрированы? Войти
            </NavLink>
        </div>
    )
}

export default Register;