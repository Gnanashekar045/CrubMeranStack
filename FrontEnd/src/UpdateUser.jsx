import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { id } = useParams();

  const fetchSingleUser = async () => {
    const res = await axios.get(`http://localhost:5000/read/${id}`);
    console.log(res);
    setInputUser({
      name: res.data.name,
      email: res.data.email,
      password: res.data.password,
    });
  };

  useEffect(() => {
    fetchSingleUser();
  }, []);

  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputUser);
    const res = await axios.put(
      `http://localhost:5000/updateuser/${id}`,
      inputUser
    );
    console.log(res);
    if (res.status === 200) {
      window.location = "/";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Update User</h1>
        <div>
          <label>Name</label>
          <input type="text" name="name" placeholder="Enter name" required value={inputUser.name} onChange={handleChange}/>
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
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
