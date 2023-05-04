import logoPath from '../images/logo.svg';

function Header() {
    return (
        <header className="header">
            <a className="header__logo-link" href="/" target="_self">
                <img className="header__logo" src={logoPath} alt="Логотип сайта Место" />
            </a>
        </header>
    )
}

export default Header;