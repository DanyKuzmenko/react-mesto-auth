import logo from '../images/Vector.svg';
import React from 'react';

function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Логотип Mesto." className="header__image" />
        </header>
    )
}

export default Header;