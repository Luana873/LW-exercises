import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      const err = register(email, password, confirmPassword);
      if (err) {
        setError(err);
      } else {
        navigate("/dashboard");
      }
    } else {
      const err = login(email, password);
      if (err) {
        setError(err);
      } else {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="card">
      <h2>{isRegister ? "Cadastre-se 💜" : "Login 💜"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegister && (
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <button type="submit" className="button">
          {isRegister ? "Cadastrar" : "Entrar"}
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        {isRegister ? "Já tem conta?" : "Não tem conta?"}{" "}
        <span
          style={{ color: "#6b21a8", cursor: "pointer" }}
          onClick={() => {
            setIsRegister(!isRegister);
            setError(null);
          }}
        >
          {isRegister ? "Faça login" : "Cadastre-se"}
        </span>
      </p>
    </div>
  );
}
