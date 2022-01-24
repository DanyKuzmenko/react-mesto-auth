import React from "react";

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <p className="footer__copyright">© {new Date().getFullYear()} Mesto Russia</p>
            </footer>
        )
    }
}

export default Footer;