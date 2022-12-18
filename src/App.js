import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { AuthContext } from "./context/AuthContext";

import "./style.scss";
import { Navigate } from "react-router-dom/dist";

function App() {
  // берем юзера из контекста
  const { currentUser } = useContext(AuthContext);

  // если пользователя нет (пустой объект currentUser) - ему доступны только страницы логина и регистрации
  const ProtectedRoot = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    // если юзер есть - возвращаем нашу домашнюю страницу
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoot>
                <Home />
              </ProtectedRoot>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
