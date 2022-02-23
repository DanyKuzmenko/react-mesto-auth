import React from "react";
import * as auth from '../auth';
import { useHistory } from 'react-router-dom';

function Login(props) {
    const [formData, setFormData] = React.useState({});
    const history = useHistory();

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        auth.authorize(formData.password, formData.email)
            .then(res => {
                props.onLogin(res.token);
                props.handleEmail(formData.email);
                setFormData({ email: '', password: '' });
                history.push('/');
            })
            .catch(err => console.log(err))
    }

    return (
        <section className="login">
            <div className="login__container">
                <h1 className="login__title">Вход</h1>
                <form className="login__form" onSubmit={handleSubmit}>
                    <input
                        className="login__input"
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        onChange={handleInputChange}
                        value={formData.email || ''} />
                    <input
                        className="login__input"
                        type="password"
                        placeholder="Пароль"
                        required
                        name="password"
                        onChange={handleInputChange}
                        value={formData.password || ''} />
                    <button
                        className="login__button"
                        type="submit"
                        aria-label="Войти." >Войти</button>
                </form>
            </div>
        </section>
    )
}

export default Login;