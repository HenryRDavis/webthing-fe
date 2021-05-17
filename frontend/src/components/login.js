import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import {useDispatch } from 'react-redux';
import axiosWithAuth from '../utils/axiosWithAuth'
import schema from '../formValidation/LoginSchema'



const initialValues = {
    username: '',
    password: ''
}

const initialErrors = {
    username: '',
    password: ''
}
const LoginForm = (props) => {
    const dispatch = useDispatch();
    const initialDisabled = true;

    const [login, setLogin] = useState([]);
    const [LoginForm, setLoginForm] = useState(initialValues);
    const  [formErrors, setFormErrors] = useState(initialErrors);
    const [disabled, setDisabled] = useState(initialDisabled);

    const postNewLogin = (newLogin) => {
        axiosWithAuth()
          .post("/users/login", newLogin)
          .then((res) => {
            setLogin([...login, newLogin]);
            setLoginForm(initialFormValues);
            dispatch({
              type: LOG_ON_SUCCESS,
              payload: {
                username: res.data.data.username,
                password: res.data.data.password,
              },
            });
            window.localStorage.setItem("token", res.data.token);
            window.location = '/home'
            window.localStorage.setItem("username", res.data.data.username);
            window.localStorage.setItem("uid", res.data.data.id);
          })
          .catch((err) => {
            alert(
              "There was an error logging you in, please reload the page and try again."
            );
            console.log(err);
          });
      };
    
      const formSubmit = (e) => {
        e.preventDefault();
        const newLogin = {
          username: LoginForm.username.trim(),
          password: LoginForm.password.trim(),
        };
        postNewLogin(newLogin);
      };
    
      const validate = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        yup
          .reach(schema, name)
          .validate(value)
          .then((valid) => {
            setFormErrors({
              ...formErrors,
              [name]: "",
            });
          })
          .catch((err) => {
            setFormErrors({
              ...formErrors,
              [name]: err.errors[0],
            });
          });
        setLoginForm({
          ...LoginForm,
          [name]: value,
        });
      };
    
      useEffect(() => {
        schema.isValid(LoginForm).then((valid) => {
          setDisabled(!valid);
        });
      }, [LoginForm]);

    return (
        <div>
          <form className={classes.form} onSubmit={formSubmit}>
            <label className={classes.labelUsername}>
              {" "}
              Username <br />
              <input
                type="text"
                name="username"
                value={LoginForm.username}
                placeholder="Username"
                onChange={validate}
                className={classes.input}
              />
              <div>{formErrors.username}</div>
            </label>{" "}
            <br />

            <label className = {classes.labelPassword}>
              Password <br />
             <input
                type="password"
                name="password"
                value={LoginForm.password}
                placeholder="Password"
                onChange={validate}
                className={classes.input}
            />
            </label>
            <div>{formErrors.password}</div>
            <LogInButton type='submit' disabled={disabled} name="loginButton">
              Login
            </LogInButton>
          </form>
        </div>
    )

}

export default LoginForm;
