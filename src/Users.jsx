import React, { useState } from "react";

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "Ali", age: 24 },
    { id: 2, name: "Samar", age: 26 },
    { id: 3, name: "Obid", age: 21 },
  ]);

  const [editingUser, setEditingUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const age = Number(e.target.age.value);

    if (!name.trim() || !age) return;

    const newUser = {
      id: Date.now(),
      name,
      age,
    };

    setUsers([...users, newUser]);
    e.target.reset();
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleReverse = () => {
    setUsers([...users].reverse());
  };

  const startEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedName = e.target.editName.value;
    const updatedAge = Number(e.target.editAge.value);

    setUsers(
      users.map((u) =>
        u.id === editingUser.id
          ? { ...u, name: updatedName, age: updatedAge }
          : u
      )
    );

    setEditingUser(null);
  };

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <h1>Users CRUD</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input type="text" name="name" placeholder="Name" />
        <input type="number" name="age" placeholder="Age" />
        <button type="submit">Add</button>
      </form>

      <button onClick={handleReverse} style={{ marginBottom: "10px" }}>
        Reverse
      </button>

      {editingUser && (
        <form onSubmit={handleUpdate} style={{ marginBottom: "20px" }}>
          <h3>Edit User</h3>
          <input type="text" name="editName" defaultValue={editingUser.name} />
          <input type="number" name="editAge" defaultValue={editingUser.age} />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditingUser(null)}>
            Cancel
          </button>
        </form>
      )}

      {users.length === 0 ? (
        <p>No Data</p>
      ) : (
        users.map((user) => (
          <div key={user.id} style={{ marginBottom: "10px" }}>
            <p>
              {user.name} | {user.age}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => startEdit(user)}
              >
                Edit
              </button>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Users;
