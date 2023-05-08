function Register() {
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>

      <form className="auth__form">
        <label className="auth__label">
          <input
            required
            type="text"
            className="auth__input"
            id="job-input"
            name="job"
            minLength={2}
            maxLength={200}
            placeholder="Email"
          ></input>

          <span className="auth__input-error job-input-error"></span>
        </label>

        <label className="auth__label">
          <input
            placeholder="Пароль"
            required
            type="text"
            className="auth__input"
            id="job-input"
            name="job"
            minLength={2}
            maxLength={200}
          ></input>

          <span className="auth__input-error job-input-error"></span>
        </label>

        <button
          aria-label="Войти"
          className="auth__submit-button"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>

      <p className="auth__helper-text">Уже зарегистрированы? Войти</p>
    </div>
  );
}

export default Register;
