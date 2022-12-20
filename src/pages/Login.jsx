import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom/dist";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // собираем данные с формы
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // если все ок - показываем домашнюю страницу (чат)
      navigate("/");
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ЛайвЧат</span>
        <span className="title">Вход</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Электронная почта" />
          <input type="password" placeholder="Пароль" />
          <button>Войти</button>
        </form>
        {err && <span>Что-то пошло не так</span>}
        <p>
          Нет аккаунта? <Link to="/register">Заргеистрируйтесь</Link>
        </p>
      </div>
    </div>
  );
};
