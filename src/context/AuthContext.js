import { useEffect, useState, createContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// создаем контекст для компонентов приложения
export const AuthContext = createContext();

// провайдер, который будет ...
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  // с помощью useEffect отслеживаем, изменился ли пользователь в приложении, и есть ли он вообще
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    // мы оборачиваем все наше приложение (в компоненте App) в компонент ниже, что дает возможность В ЛЮБОМ компоненте
    // обращаться к currentUser, что дает возможность не поднимать\опускать это значение по дереву компонентов вручную
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
