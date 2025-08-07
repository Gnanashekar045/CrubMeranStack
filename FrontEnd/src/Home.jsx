import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post("http://localhost:5000/createuser", inputUser);
    console.log(res);
    fetchAllUser();
  };

  const [userData, setUserData] = useState([]);
  const fetchAllUser = async () => {
    const res = await axios.get("http://localhost:5000/readalluser");
    console.log(res);
    setUserData(res.data);
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/delete/${id}`);
    if (res.status === 200) {
      fetchAllUser();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create User</h1>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            required
            value={inputUser.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter email"
            required
            value={inputUser.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
            value={inputUser.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add User</button>
      </form>

      <table>
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
          {userData.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{item?.password}</td>
              <td>
                <NavLink to={`/readuser/${item._id}`}>Read</NavLink>
                <NavLink to={`/updateuser/${item._id}`}>Edit</NavLink>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
