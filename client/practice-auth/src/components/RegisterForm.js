import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const RegisterForm = () => {
  const [newUser, setNewUser] = useState({
    username: '',
    password: ''
  });

  const { register, handleSubmit } = useForm();

  const handleChanges = e => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
      axiosWithAuth()
        .post('', data)
        .then(res => {
          // res
          console.log(res); 
          e.target.reset()        
        })
        .catch(err => console.log(err.response));
    };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        ref={register({ required: true, maxLength: 20 })}
        onChange={handleChanges}
      />
      <input
        type="text"
        placeholder="Password"
        name="password"
        ref={register({ required: true, maxLength: 20 })}
        onChange={handleChanges}
      />
      <input type="submit" />
    </form>
  );
};

export default RegisterForm;