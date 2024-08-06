import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./login.scss";

const Login = () => {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("Пользователь успешно вошел в систему");
        navigate("/cabinet");
      }
    } catch (error) {
      toast.error("Неправильное имя пользователя или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Войти</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            placeholder="Пароль"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          style={{ background: loading ? "#ff7575" : "#cb4a4a" }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Загрузка..." : "Войти"}
        </button>
      </form>
    </div>
  );
};

export default Login;
