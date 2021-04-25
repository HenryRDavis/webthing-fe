import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import schema from '../formValidation/SignUpSchema';
import styled from 'styled-components';
import {useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/actions';

// STYLING
const FormContainerDiv = styled.div`
  display: flex;
  height:400px;
  width:320px;
  border-radius:2rem;
  flex-direction:column;
  justify-content:center;
  font-family: 'Comfortaa', cursive;
/*   height: 75vh; */
  background-color: #ffffff;
  padding: 1rem;
  .form-text-top {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #welcome-text {
    font-weight: 400;
    font-size: 3rem; 
  }
  #sub-text {
    font-family: 'MuseoModerno', cursive;
    font-size: 2.5rem;
  }
  #sub-text {
    font-family: 'MuseoModerno', cursive;
  }
  form {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-content: center   
  }
  .form-bottom {
      display: flex;
      justify-content: center;
      #no-account {
          font-size: .15rem;
          margin-right: .35rem;
      }
      #sign-up {
          font-size: .15rem;
          font-weight: 750;
      }
  }
  .error {
      color: red;
      font-size: 1.5rem;
  }
  
  button {
      color: white;
      padding:1rem 0;
      margin-bottom:1rem;
  }

  .btn {
    flex: 1 1 auto;
    background-image: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%);
    margin: 10px;
    border-radius: 5px;
    padding: 3px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 150% auto;
    color: white;
    /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
    box-shadow: 0 0 20px #eee;
    .btn:hover {
        background-position: right center;
    }

    .btn-disabled {
    flex: 1 1 auto;
    /* background-image: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%); */
    background-color: grey;
    margin: 10px;
    border-radius: 5px;
    padding: 3px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 150% auto;
    color: white;
    /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
    box-shadow: 0 0 20px #eee;
    }
    .btn:hover {
        background-position: right center;
    }
  }

  input {
      margin-bottom: .15rem;
      margin-bottom: 2rem;
      outline: 0;
      border-width: 0 0 2px;
      border-color: pink;
  }
  input:focus {
      border-color: pink;
  }
  input[placeholder] {
      font-size:2rem;
  }
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 1px rgba(0,0,0,0.09), 
              0 4px 2px rgba(0,0,0,0.09), 
              0 8px 4px rgba(0,0,0,0.09), 
              0 16px 8px rgba(0,0,0,0.09),
              0 32px 16px rgba(0,0,0,0.09);
`

const SignUpDiv = styled.div`
    height:100%;
    min-height:500px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    .form-bottom {
        font-size:2rem;
        .link {
            text-decoration:none;
            color:black;
            font-weight:bold;
            &:hover {
                color:pink;
            }
        }
    }
`

// STYLING END



const initialValues = {
    name: '',
    username: '',
    password: ''
}   

const initialErrors = {
    name: '',
    username: '',
    password: ''
}


export default function Signup() {

     const [signUp, setSignUpForm] = useState(initialValues)

     const [formErrors, setFormErrors] = useState(initialErrors)

     const [disabled, setDisabled] = useState(true)

     const registering = useSelector(state => state.registration.registering);
     const dispatch = useDispatch();

     const inputChange = (name, value) => {
        yup.reach(schema,name)
        .validate(value)
        .then(() => {
            setFormErrors({
                ...formErrors,[name]: ''
            })
        })
        .catch((err) => {
            setFormErrors({
              ...formErrors, [name]: err.errors[0],
            })
          }) 
        setSignUpForm({
            ...signUp, [name]: value
        })
     }

     const onChange = e => {
         const {name, value} = e.target
         inputChange(name,value)
     }

     const formSubmit = () => {
         const newSignUp = {
             name: signUp.name.trim(),
             username: signUp.username.trim(),
             password: signUp.password.trim(),
         }
         sendSignUp(newSignUp)
     }

     const onSubmit = e => {
         e.preventDefault()
         formSubmit()
     }

     useEffect(() => {
        schema.isValid(signUp)
        .then((valid) => {
          setDisabled(!valid);
        });
      }, [signUp]);


     const sendSignUp = newSignUp => {
        console.log(newSignUp)

        dispatch(actions.register(newSignUp));
     }

    return (
        <SignUpDiv>
        <FormContainerDiv>
        <div class="form-text-top">
            <p id="sub-text">Sign up Here!</p>
        </div>
            <form onSubmit={onSubmit}>
                {formErrors.username.length > 0 ? <p className="error">{formErrors.username}</p> : null}
                <input 
                type="text" 
                name="username" 
                value={signUp.username}
                onChange={onChange}
                placeholder="Username"/>
                    
                {formErrors.password.length > 0 ? <p className="error">{formErrors.password}</p> : null}
                <input 
                id="bottom-input"
                type="password" 
                name="password" 
                value={signUp.password}
                onChange={onChange}
                placeholder="Password"/>
                    
               {registering && <p>Signing Up...</p>}
                {disabled === true ? <button className="btn-disabled" disabled={disabled}>Confirm</button> : <button className="btn" disabled={disabled}>Confirm</button>}
                </form>
               
        </FormContainerDiv>
        </SignUpDiv>
    )
}

