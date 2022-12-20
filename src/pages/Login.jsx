import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom/dist";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const Login = () => {
  const [err, setErr] = useState(false);
  const [errMess, setErrMess] = useState("");
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
      // проверяем код ошибки
      switch (err.code) {
        case "auth/user-not-found":
          setErrMess("Неверный логин или пароль!");
          break;
        default:
          setErrMess("Что-то пошло не так");
          break;
      }
      console.log(err);
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
          <button disabled={loading}>{loading ? "Вход..." : "Войти"}</button>
        </form>
        {err && <span>{errMess}</span>}
        <p>
          Нет аккаунта? <Link to="/register">Заргеистрируйтесь</Link>
        </p>
      </div>
    </div>
  );
};
