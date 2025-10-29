import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
/* eslint-disable react-refresh/only-export-components */

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => string | null; // retorna erro se houver
  register: (email: string, password: string, confirmPassword: string) => string | null; // retorna erro se houver
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => null,
  register: () => null,
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUsers = localStorage.getItem("users");
    if (storedUser) setUser(storedUser);
    if (storedUsers) setUsers(JSON.parse(storedUsers));
  }, []);

  const saveUsers = (users: User[]) => {
    setUsers(users);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const login = (email: string, password: string) => {
    const existingUser = users.find(u => u.email === email);
    if (!existingUser) return "Usuário não encontrado";
    if (existingUser.password !== password) return "Senha incorreta";

    setUser(email);
    localStorage.setItem("user", email);
    return null;
  };

  const register = (email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) return "As senhas não coincidem";

    const existingUser = users.find(u => u.email === email);
    if (existingUser) return "Usuário já cadastrado";

    const newUser = { email, password };
    saveUsers([...users, newUser]);
    setUser(email);
    localStorage.setItem("user", email);
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
