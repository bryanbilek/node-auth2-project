import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const { register, handleSubmit, reset } = useForm();
  const { history } = useHistory();

  const handleChanges = e => {
    setUser({...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("", data)
      .then(res => {
        console.log('LOGIN res', res);
        localStorage.setItem("token", JSON.stringify(res.data.payload))
        history.push("/protected")
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
        type="password"
        placeholder="Password"
        name="password"
        ref={register({ required: true, maxLength: 20 })}
        onChange={handleChanges}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;