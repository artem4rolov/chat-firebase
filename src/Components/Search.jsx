import React, { useContext, useState } from "react";
// импорт коллекции юзеров из firebase
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(undefined);
  const [err, setErr] = useState(false);

  // получаем юзера, который вошел в приложение
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    // все по документации firebase
    // https://firebase.google.com/docs/firestore/query-data/queries
    const q = query(
      // запрос к БД "users"
      collection(db, "users"),
      // где необходимо найти совпадения по свойству userName (только полный ввод и нажатие enter)
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        setErr(false);
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    // по нажатию enter производим поиск юзеров в БД firebase
    e.code === "Enter" && handleSearch();
  };

  const handleButton = () => {
    handleSearch();
  };

  // клик на юзера в поиске или списке чатов
  const handleSelect = async () => {
    // необходимо проверить является эта группа людей чатом в firestore, если ее нет - создаем ее
    // создаем чат с двумя людьми (складываем строки user.uid и currentUser.uid), получится уникальный id конкретного чата
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    // теперь ищем полученный идентификатор (сумма uid двух пользователей) в БД firebase
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // если нет такого чата - создадим его (метод exist - это метод из firebase)
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // создаем инфу чата пользователя (слева в сайдбаре, где списки чатов)
        // необходимо знать id, никнейм, фото и дату последнего сообщения
        // serverTimestamp - функция из firebase, которая учитывает часовые пояса, лучше использовать ее
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // и карточку для текущего пользователя
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        setErr(false);
      }
    } catch (err) {
      setErr(err);
    }

    // очищаем поле поиска и закрываем окно с поиском в сайдбаре
    setUser(undefined);
    setUserName("");

    // создать чат юзеров
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Поиск..."
          onChange={(e) => setUserName(e.target.value)}
          onInput={(e) => setUserName(e.target.value)}
          onKeyDown={handleKey}
          value={userName}
        />
        <button className="mobileButtonSearch" onClick={handleButton}>
          Поиск
        </button>
      </div>
      {err && <span>Поиск не дал результатов</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
