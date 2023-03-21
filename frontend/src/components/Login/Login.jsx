
import AuthForm from '../AuthForm/AuthForm';

function Login({ login }) {
    return (
        <div className="register">
            <AuthForm title='Вход' buttonText='Войти' onSubmit={login} />
        </div>
    )
}

export default Login;