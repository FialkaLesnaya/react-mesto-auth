import { Link, Route, Routes } from "react-router-dom";
import logoPath from "../images/logo.svg";

function Header() {
  const signInLink = (
    <Link className="header__link" to="/sign-in">
      Войти
    </Link>
  );
  const registrationLink = (
    <Link className="header__link" to="/sign-up">
      Регистрация
    </Link>
  );

  return (
    <header className="header">
      <a className="header__logo-link" href="/" target="_self">
        <img
          className="header__logo"
          src={logoPath}
          alt="Логотип сайта Место"
        />
      </a>

      <div className="header__navigation">
        <Routes>
          <Route path="/sign-in" element={registrationLink} />
          <Route path="/sign-up" element={signInLink} />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
