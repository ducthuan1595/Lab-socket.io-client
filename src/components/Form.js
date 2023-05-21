import { useContext, useEffect, useState } from "react";
import request from "../service";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/useContext";
import Navigation from "./Navigation";
// import openSocket  from 'socket.io-client';

const Form = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState("");
  const [isValue, setIsValue] = useState(true);

  const navigate = useNavigate();
  const { params } = useParams();
  const { setUser } = useContext(Context);

  const handleChangeInput = (e, name) => {
    setIsValid("");
    const cpState = { ...inputValue };
    cpState[name] = e.target.value;
    setInputValue(cpState);
  };

  const handleBlur = (key) => {
    if (key === "name" && inputValue.name.trim().length < 2) {
      setIsValid("Please, Enter your name!");
      setIsValue(true)
    } else if (
      (key === "email" && inputValue.email.trim().length < 1) ||
      !inputValue.email.includes("@")
    ) {
      setIsValid("Please, Enter your email!");
      setIsValue(true);
    } else if (key === "password" && inputValue.password.trim().length < 5) {
      setIsValue(true);
      setIsValid("Please, Password must be at least 6 charts!");
    }
    setIsValue(false);
  };

  const handleSubmit = async () => {
    if (isValue) {
      return setIsValid("Invalid value input!");
    } else {
      if (params === "login") {
        const value = {
          email: inputValue.email,
          password: inputValue.password,
        };
        const validateStatus = (status) => {
          return status <= 500; // Reject only if the status code is greater than 300
          }
        const res = await request.login(value, validateStatus);
        if (res.data.message !== "ok") {
          return setIsValid("Invalid value input!");
        }
        setUser(res.data.user);
        navigate("/");
      } else {
        const res = await request.signup(inputValue);
        if (res.data.message !== "ok") {
          return setIsValid("Invalid value input!");
        }
        console.log(res.data);
        setInputValue({
          name: '',
          email: "",
          password: "",
        });
        navigate("/auth/login");
      }
    }
  };

  // useEffect(() => {
  //   const socket = openSocket('http://localhost:5001');
  //   socket.on('posts', data => {
  //     if (data.action === 'create') {
  //       this.addPost(data.post);
  //     } else if (data.action === 'update') {
  //       this.updatePost(data.post);
  //     } else if (data.action === 'delete') {
  //       this.loadPosts();
  //     }
  //   });
  // }, [])

  return (
    <>
      <Navigation />
      <div className="form">
        {params === "signup" && (
          <>
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              value={inputValue.name}
              onBlur={handleBlur.bind(null, "name")}
              onChange={(e) => handleChangeInput(e, "name")}
            />
          </>
        )}
        <label>Your Email</label>
        <input
          type="email"
          name="email"
          value={inputValue.email}
          onBlur={handleBlur.bind(null, "email")}
          onChange={(e) => handleChangeInput(e, "email")}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={inputValue.password}
          onBlur={handleBlur.bind(null, "password")}
          onChange={(e) => handleChangeInput(e, "password")}
        />
        <div className="message-error">{isValid}</div>
        <button className="btn" type="submit" onClick={handleSubmit}>
          Register
        </button>
      </div>
    </>
  );
};

export default Form;
