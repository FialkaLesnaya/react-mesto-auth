import { Link, Route, Routes } from "react-router-dom";
import logoPath from "../images/logo.svg";
import { useContext } from "react";
import { CurrentUserContext } from "contexts/CurrentUserContext";

function Header(props) {
  const currentUser = useContext(CurrentUserContext);

  function onLogOut() {
    props.handeLogOut();
  }

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

  const exitLink = (
    <div>
      <span>{currentUser.email}</span>
      <Link className="header__link" to="/sign-in" onClick={onLogOut}>
        Выйти
      </Link>
    </div>
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
          <Route path="/" element={exitLink} />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
