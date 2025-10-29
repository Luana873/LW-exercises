import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="card">
      <h2>Bem-vindo, {user}! 🌸</h2>
      <button className="button" onClick={handleLogout}>Sair</button>
    </div>
  );
}
