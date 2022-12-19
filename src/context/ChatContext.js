import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

// создаем контекст для компонентов приложения
export const ChatContext = createContext();

// провайдер, который будет ...
export const ChatContextProvider = ({ children }) => {
  // получаем юзера, который вошел в приложение
  const { currentUser } = useContext(AuthContext);
  // userReducer
  // создаем начальное состояние, где выбранный пользователь изначально = "", и uid чата с этим пользователем изначально null
  const INITIAL_STATE = {
    chatID: undefined,
    user: {},
  };

  // при клике на пользователя, задаем выбранный id чата и задаем выбранного пользователя
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    // мы оборачиваем все наше приложение (в компоненте App) в компонент ниже, что дает возможность В ЛЮБОМ компоненте
    // обращаться к currentUser, что дает возможность не поднимать\опускать это значение по дереву компонентов вручную
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
