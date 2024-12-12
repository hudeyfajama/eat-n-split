import React, { useState } from "react";

export function NewUser({ onAddUser }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name,
      balance: 0,
      image: image || "https://i.pravatar.cc/48",
    };
    onAddUser(newUser);
    setName("");
    setImage("");
  };

  return (
    <form className="new-user" onSubmit={handleSubmit}>
      <div className="input-stack">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <Button>Add User</Button>
    </form>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}
