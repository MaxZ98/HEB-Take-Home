import { ReactNode, createContext, useEffect, useState } from "react";

type User = {
  pin: string;
  balance: number;
  dailyLimit: number;
};

type ATMContextProps = {
  users: User[];
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  addUser: (pin: string) => void;
};

const ATMContext = createContext<ATMContextProps | undefined>(undefined);

const ATMProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const addUser = (pin: string) => {
    const newUser: User = {
      pin,
      balance: 0,
      dailyLimit: 500,
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };

  return (
    <ATMContext.Provider
      value={{ users, currentUser, setCurrentUser, addUser }}
    >
      {children}
    </ATMContext.Provider>
  );
};

export { ATMContext, ATMProvider };
