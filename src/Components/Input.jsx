import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
// генератор уникальных id
import { v4 as uuid } from "uuid";

import AttachFile from "../img/attach.png";
import Img from "../img/img.png";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [sendingImg, setSendingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // по нажатию Enter отправляем сообщение
  const handleSendOnKeyPress = (e) => {
    e.code === "Enter" && handleSend();
  };

  const handleSend = async (e) => {
    if (img) {
      // даем класс для тега img, чтобы понять что мы прикрепили картинку в чат
      setSendingImg(true);
      setLoading(true);
      // если мы крепим изображение в чат, то загружаем его на сервер (хранилище firebase, как при регистрации)

      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // setErr(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // заносим это изображение в массив messages, БД chats в firebase
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                // обязательно даем уникальный id картинке
                id: uuid(),
                text,
                // отправитель - юзер, вошедший в систему
                senderId: currentUser.uid,
                date: Timestamp.now().toMillis(),
                img: downloadURL,
              }),
            });
            // обозначаем окончание загрузки
            setLoading(false);
          });
        }
      );

      // если нет изображение - отправляем в чат только текст, соответственно заносим сообщение в массив messages в БД chats
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          // также обязательно даем уникальный id каждому сообщению
          id: uuid(),
          text: text ? text : "Изображение",
          senderId: currentUser.uid,
          // переводим серверное время в миллисекунды, чтобы потом перевести время отправки\получения сообщения в человеческий вид
          date: Timestamp.now().toMillis(),
        }),
      });
      // обозначаем загрузку
      setLoading(true);
    }

    // также после отправки сообщения в чат, необходимо постоянно обновлять поле lastMessae (последнее сообщение) в userChats
    // для текущего пользователя
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".data"]: serverTimestamp(),
    });

    // для пользователя, с кем мы общаемся в чате - также обновляем последнее сообщение
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".data"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
    setLoading(false);
    setSendingImg(false);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Наберите сообщение..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={(e) => handleSendOnKeyPress(e)}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
          accept=".png, .jpg, .jpeg"
        />
        <label htmlFor="file">
          <img src={Img} alt="" className={sendingImg ? "sendingImg" : null} />
        </label>
        <button onClick={handleSend} onKeyDown={handleSend} disabled={loading}>
          {loading ? "Отправляем..." : "Отправить"}
        </button>
      </div>
    </div>
  );
};
