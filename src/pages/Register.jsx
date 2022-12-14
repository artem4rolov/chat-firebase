import React from "react";

import addAvatar from "../img/addAvatar.png";

export const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Лайв-чат</span>
        <span className="title">Регистрация</span>
        <form>
          <input type="text" placeholder="Никнейм" />
          <input type="email" placeholder="Электронная почта" />
          <input type="password" placeholder="Пароль" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={addAvatar} alt="Добавить аватар" />
            <span>Добавить аватар</span>
          </label>
          <button>Зарегистрироваться</button>
        </form>
        <p>Есть аккаунт? Войдите</p>
      </div>
    </div>
  );
};
