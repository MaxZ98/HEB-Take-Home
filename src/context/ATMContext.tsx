import { ReactNode, createContext, useEffect, useState } from "react";

type User = {
  pin: string;
  balance: number;
  dailyLimit: number;
  dailyWithdrawals: number;
};

type ATMContextProps = {
  users: User[];
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  addUser: (pin: string) => void;
  updateUserBalance: (amount: number, type: "deposit" | "withdraw") => void;
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

  useEffect(() => {
    const resetDailyWithdrawals = () => {
      const updatedUsers = users.map((user) => ({
        ...user,
        dailyWithdrawals: 0,
      }));
      setUsers(updatedUsers);
    };

    // Calculate the time until the next midnight
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const timeUntilMidnight = nextMidnight.getTime() - now.getTime();

    // Set a timeout to reset dailyWithdrawals at the next midnight
    const initialTimeout = setTimeout(() => {
      resetDailyWithdrawals();

      // Set an interval to reset dailyWithdrawals every 24 hours after the first reset
      const interval = setInterval(resetDailyWithdrawals, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

      // Clear interval on cleanup
      return () => clearInterval(interval);
    }, timeUntilMidnight);

    // Clear timeout on cleanup
    return () => clearTimeout(initialTimeout);
  }, [users]);

  const addUser = (pin: string) => {
    const newUser: User = {
      pin,
      balance: 0,
      dailyLimit: 500,
      dailyWithdrawals: 0,
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };

  const updateUserBalance = (amount: number, type: "deposit" | "withdraw") => {
    if (currentUser) {
      const updatedBalance =
        type === "deposit"
          ? currentUser.balance + amount
          : currentUser.balance - amount;

      if (updatedBalance < 0) {
        alert("Insufficient funds");
        return;
      }

      if (
        type === "withdraw" &&
        currentUser.dailyWithdrawals + amount > currentUser.dailyLimit
      ) {
        alert("Daily withdrawal limit exceeded");
        return;
      }

      const updatedUsers = users.map((user) =>
        user.pin === currentUser.pin
          ? {
              ...user,
              balance: updatedBalance,
              dailyWithdrawals:
                type === "withdraw"
                  ? user.dailyWithdrawals + amount
                  : user.dailyWithdrawals,
            }
          : user
      );

      const updatedUser = updatedUsers.find(
        (user) => user.pin === currentUser.pin
      );
      setUsers(updatedUsers);
      setCurrentUser(updatedUser || null);
    } else {
      alert("No user is currently logged in.");
    }
  };

  return (
    <ATMContext.Provider
      value={{ users, currentUser, setCurrentUser, addUser, updateUserBalance }}
    >
      {children}
    </ATMContext.Provider>
  );
};

export { ATMContext, ATMProvider };
