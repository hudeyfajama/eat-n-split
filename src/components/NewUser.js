import React, { useState } from 'react';

export function NewUser({ onAddUser }) {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name,
      balance: Number(balance),
      image: image || 'https://i.pravatar.cc/48'
    };
    onAddUser(newUser);
    setName('');
    setBalance('');
    setImage('');
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
          type="number" 
          placeholder="Balance" 
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
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