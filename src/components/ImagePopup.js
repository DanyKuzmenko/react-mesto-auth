import React from "react";

class ImagePopup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={`popup popup_type_image ${this.props.card.name && this.props.card.link ? 'popup_opened' : ''}`}>
                <div className="popup__body">
                    <button type="button" aria-label="Закрыть картинку" className="popup__close-button popup__close-button_type_image" onClick={this.props.onClose}></button>
                    <img src={this.props.card.link} alt={this.props.card.name} className="popup__image" />
                    <h2 className="popup__figcaption popup__figcaption_type_image">{this.props.card.name}</h2>
                </div>
            </div>
        )
    }
}

export default ImagePopup;