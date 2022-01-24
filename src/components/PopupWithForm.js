import React from "react";

class PopupWithForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`popup popup_type_${this.props.name} ${this.props.isOpen ? 'popup_opened' : ''}`}>
                <div className="popup__container">
                    <button type="button" aria-label="Закрыть форму." className="popup__close-button popup__close-button_type_card" onClick={this.props.onClose}></button>
                    <h2 className="popup__title">{this.props.title}</h2>
                    <form className="popup__form popup__form_type_card" name={`popup${this.props.name}Form`} noValidate> {/* доделать связанность формы с name */}
                        {this.props.children}
                        <button type="submit" aria-label="Создать." className="popup__button">Создать</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default PopupWithForm;