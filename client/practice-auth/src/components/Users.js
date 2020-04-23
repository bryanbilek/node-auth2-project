import React, { useState, useEffect } from "react";
import RegisterForm from "./RegisterForm";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosWithAuth().get('')
    .then(res => {
      console.log('USERS res', res.data)
      setUsers(res.data)
    })
    .catch(err => console.log(err))
  }, []);

  return (
    <div className="users-list">
      <RegisterForm />
      <h1>Users List</h1>
      {users.map(user => {
        return(
          <div className="user-info" key={user.id}>
            <p>Username: {user.username}</p>
          </div>
        )
      })}
    </div>
  );
};

export default Users;