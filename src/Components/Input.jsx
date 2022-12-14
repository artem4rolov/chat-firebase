import React from "react";

import AttachFile from "../img/attach.png";
import Img from "../img/img.png";

export const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Наберите сообщение..." />
      <div className="send">
        <img src={AttachFile} alt="" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button>Отправить</button>
      </div>
    </div>
  );
};
