import logo from '../images/Vector.svg';
import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <img src={logo} alt="Логотип Mesto." className="header__image" />
            </header>
        )
    }
}

export default Header;