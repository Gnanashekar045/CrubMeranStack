import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/readalluser");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // const handleChange = (e) => {
  //   setInputUser({ ...inputUser, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    const {value, name} = e.target
    setInputUser((pre)=>({
      ...pre, [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`http://localhost:5000/updateuser/${editId}`, inputUser);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/createuser", inputUser);
    }

    setInputUser({ name: "", email: "", password: "" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setInputUser({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/delete/${id}`);
    fetchUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{editId ? "Update User" : "Create User"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" value={inputUser.name} onChange={handleChange} required/>
        </div>
        <div>
          <label>Email:</label>
          <input name="email" value={inputUser.email} onChange={handleChange} required/>
        </div>
        <div>
          <label>Password:</label>
          <input name="password" value={inputUser.password} onChange={handleChange} required />
        </div>
        <button type="submit">{editId ? "Update" : "Add"}User</button>
      </form>

      <h3 style={{ marginTop: "30px" }}>User List</h3>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>SN.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user._id}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
