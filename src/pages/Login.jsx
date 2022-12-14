import React from "react";

export const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Лайв-чат</span>
        <span className="title">Вход</span>
        <form>
          <input type="text" placeholder="Никнейм" />
          <input type="email" placeholder="Электронная почта" />
          <input type="password" placeholder="Пароль" />
          <button>Войти</button>
        </form>
        <p>Нет аккаунта? Заргеистрируйтесь</p>
      </div>
    </div>
  );
};
