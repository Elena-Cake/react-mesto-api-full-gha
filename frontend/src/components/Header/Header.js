import logoPath from '../../images/header_logo.svg';

import { Route, Link, Routes } from 'react-router-dom';

function Header({ emailUser, signOut, showUser, openMenu, hideMenu }) {

    return (
        <header className="header">
            <Routes>
                <Route path="/signup" element={
                    <div className='header__navigate'>
                        <img className="header__logo" src={logoPath} alt="логотип 'Место'" />
                        <Link to={"/signin"} className="navbar__text navbar__text_type_link">Войти</Link>
                    </div>} />
                <Route path="/signin" element={
                    <div className='header__navigate'>
                        <img className="header__logo" src={logoPath} alt="логотип 'Место'" />
                        <Link to={"/signup"} className="navbar__text navbar__text_type_link">Регистрация</Link>
                    </div>} />
                <Route path="/" element={
                    <div className='header__menu'>
                        <img className="header__logo header__logo_media_desctop" src={logoPath} alt="логотип 'Место'" />
                        <div className={`navbar__main ${showUser ? 'navbar__main_open' : ''}`}>
                            <p className='navbar__text'>{emailUser}</p>
                            <button className='navbar__text navbar__text_type_link' onClick={signOut}>Выйти</button>
                        </div>
                        <div className='header__main'>
                            <img className="header__logo header__logo_media_mobile" src={logoPath} alt="логотип 'Место'" />
                            {!showUser ?
                                <button className='navbar__burger' onClick={openMenu}>
                                    <div className='navbar__line'></div>
                                    <div className='navbar__line'></div>
                                    <div className='navbar__line'></div>
                                </button>
                                :
                                <button className='navbar__close-btn' onClick={hideMenu}>&#x2715;</button>
                            }
                        </div>
                    </div>} />
            </Routes>
        </header >
    )
}

export default Header;