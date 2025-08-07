import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReadUser = () => {
  const { id } = useParams();

  const [userData, setUserData] = useState({});

  const fetchSingleUser = async () => {
    const res = await axios.get(`http://localhost:5000/read/${id}`);
    console.log(res);
    setUserData(res.data);
  };

  useEffect(() => {
    fetchSingleUser();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>SN.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{userData.name}</td>
            <td>{userData.email}</td>
            <td>{userData.password}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReadUser;
