import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // собираем данные с формы
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //создаем пользователя
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //уникальное имя для изображения
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        // загружаем изображение на сервер
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //обновляем профиль юзера (аватар, никнейм)
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //создаем юзера в firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //создаем пустой чат этого юзера в firestore (пустой объект - потому что при регистрации чатов у юзера еще нет)
            await setDoc(doc(db, "userChats", res.user.uid), {});
            // если все прошло гуд - идем на главную (<Home />)
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Лайв Чат</span>
        <span className="title">Регистрация</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Ваше имя в чате" />
          <input required type="email" placeholder="Электронная почта" />
          <input required type="password" placeholder="Пароль" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="добавить аватар" />
            <span>Добавить аватар</span>
          </label>
          <button disabled={loading}>Регистрация</button>
          {loading && "Пожалуйста, подождите..."}
          {err && <span>Что-то пошло не так</span>}
        </form>
        <p>
          У вас есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};
