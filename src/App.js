import React, { useState, useEffect } from "react";
import "./App.css";
import { User } from "./components/User";
import { SplitBill } from "./components/SplitBill";
import { NewUser } from "./components/NewUser";
import ShowMore from "./components/ShowMore";
import CurrencyExchange from "./components/CurrencyExchange";
function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [yourExpense, setYourExpense] = useState(0);
  const [billValue, setBillValue] = useState(0);
  const [whoIsPaying, setWhoIsPaying] = useState("you");

  const handleSplitBill = (billValue, yourExpense, whoIsPaying) => {
    setUsers(
      users.map((user) => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            balance:
              whoIsPaying === "you"
                ? Math.abs(yourExpense - billValue) // They owe you when you pay
                : Math.abs(yourExpense), // You owe them when they pay
          };
        }
        return user;
      })
    );
  };

  useEffect(() => {
    setIsLoading(true);
    // Fetch 3 users at once
    fetch("https://randomuser.me/api/?results=3")
      .then((response) => response.json())
      .then((data) => {
        const formattedUsers = data.results.map((user) => ({
          id: user.login.uuid,
          image: user.picture.large,
          name: `${user.name.first}`,
          balance: 0,
        }));
        setUsers(formattedUsers);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      });
  }, []);

  const handleAddUser = (user) => {
    setUsers([...users, user]);
  };

  function handleSelectUser(user) {
    setSelectedUser(selectedUser?.id === user.id ? null : user);
  }

  return (
    < CurrencyExchange />
    // <ShowMore />
    // <div className="App">
    //   <div className="app-container">
    //     <div className="user-stack">
    //       {users.map((user) => (
    //         <User
    //           key={user.id}
    //           user={user}
    //           isLoading={isLoading}
    //           onSelect={handleSelectUser}
    //           isSelected={selectedUser?.id === user.id}
    //           balance={user.balance}
    //           whoIsPaying={whoIsPaying}
    //           yourExpense={yourExpense}
    //         />
    //       ))}
    //       <NewUser onAddUser={handleAddUser} />
    //     </div>
    //     <div className="split-bill">
    //       <SplitBill
    //         whoIsPaying={whoIsPaying}
    //         selectedUser={selectedUser}
    //         onSplitBill={handleSplitBill}
    //         yourExpense={yourExpense}
    //         setYourExpense={setYourExpense}
    //         billValue={billValue}
    //         setBillValue={setBillValue}
    //         setWhoIsPaying={setWhoIsPaying}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
