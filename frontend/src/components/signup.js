import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import schema from '../formValidation/SignUpSchema';
import axiosWithAuth from '../utils/axiosWithAuth'
// STYLING END



const initialValues = {
    username: '',
    password: ''
}   

const initialErrors = {
    username: '',
    password: ''
}


const Signup = (props) => {
    const [signupForm, setSignupForm] = useState(initialValues);
    const [responseMsg, setResponseMsg] = useState({ success: null, msg: "" });
    const [formErrors, setFormErrors] = useState(initialErrors);
    const [disabled, setDisabled] = useState(true);
    const [formChanged, setFormChanged] = useState(false);
  
    useEffect(() => {
      if (props && props.userData) {
        setSignupForm(props.userData);
      }
    }, [props]);
  
    const handleInputChange = (e) => {
      const target = e.target;
  
      validate(target.name, target.value);
  
      setSignupForm({ ...signupForm, [target.name]: target.value });
    };
  
    const validate = (name, value) => {
      yup
        .reach(schema, name)
        .validate(value)
        .then((valid) => {
          setFormChanged(true);
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
    };
  
    useEffect(() => {
      schema.isValid(signupForm).then((valid) => {
        setDisabled(!valid);
      });
    }, [signupForm]);
  
    useEffect(() => {
  
      schema.isValid(formChanged).then((valid) => {
        setDisabled(!valid);
      });
    }, [formChanged]);
  
    const onFormSubmit = (e) => {
      e.preventDefault();
      axiosWithAuth()
        .post("/users/register", signupForm)
        .then((res) => {
          console.log(res);
          if (res.statusText === "Created") {
            console.log("New account is created successfully.");
            const successMsg = props.btn
              ? "Account is updated successfully."
              : "New account is created successfully.";
            setSignupForm(initialValues);
            setResponseMsg({
              success: true,
              msg: successMsg,
            });
          }
          window.location = '/login'
        })
        .catch((err) => {
          // debugger;
          if (err.response) {
            console.log(err.response);
            setResponseMsg({
              success: false,
              msg: err.response.data.message,
            });
          }
        });
    };

    return (
        <div>
          {responseMsg.success !== null && (
            <p
            className={`text-center ${
                responseMsg.success ? "text-success" : "text-danger"
            }`}
            >
            {responseMsg.msg}
            </p>
          )}
      <form className={classes.form} onSubmit={onFormSubmit}>
          <label className={classes.labelUsername}>
            Username <br />
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={signupForm.username}
              onChange={handleInputChange}
              className={classes.input}
            />
            <div className="text-danger">{formErrors.username}</div>
        </label>
        <label className={classes.labelPassword}>
            Password <br />
            <input
              name="password"
              type="password"
              value={signupForm.password}
              onChange={handleInputChange}
              className={classes.input}
          />
            <div className="text-danger">{formErrors.password}</div>
          </label>
        <SignUpButton type='submit' disabled={disabled} name="loginButton">
          submit
        </SignUpButton>
      </form>
    </div>
    )
}

export default Signup;