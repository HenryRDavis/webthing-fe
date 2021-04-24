import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import {useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { userActions } from '../_actions';

import schema from '../formValidation/LoginSchema'

const initialValues = {
    username: '',
    password: ''
}

const initialErrors = {
    username: '',
    password: ''
}

function Login () {
    const [loginForm, setLoginForm] = useState(initialValues)

    const  [formErrors, setForErrors] = useState(initialErrors)

    const [disabled, setDisabled] = useState(true)

    const loggedIn = useSelector(state => stae.authentication.loggedIn);
    const dispatch = useDispatch();

    const inputChange = (name, value) => {
        yup.reach(schema, name)
        .validate(value)
        .then(() => {
            setForErrors({
                ...formErrors, [name]: ''
            })
        })
        .catch((err) => {
            setForErrors({
                ...formErrors, [name]: err.errors[0],
            })
        })
        setLoginForm({
            ...loggedIn, [name]: value
        })
    }

    const onChange = e => {
        const {name, value} = e.target
        inputChange(name, value)
    }

    const formSubmit = () => {
        const newLogin = {
            username: loginForm.username.trim(),
            password: loginForm.password.trim()
        }
        sendSignUp(newLogin)
    }

    const onSubmit = e => {
        e.preventDefault()
        formSubmit
    }

    useEffect(() => {
        schema.isValid(loginForm)
        .then((valid) => {
            setDisabled(!valid);
        });
    }, [loginForm]);

    const sendSignUp = newLogin => {
        console.log(newLogin)

        dispatch(userActions.login(newLogin))
    }

    return (
        <LoginDiv> 
            <FormContainerDiv>
                <div className='text-top'>
                    <p class='grettings'>Hello! Nice to See you again!</p>
                    <p class='grettings'>Login to get back to what you were doing!</p>
                </div>
                <div className='input'>
                    <form onSubmit={onSubmit}>
                        {formErrors.username.length > 0 ? <P className='error'>{formErrors.username} </P> : null}
                        <input
                        type='text'
                        name='username'
                        value={loginForm.username}
                        onChange={onChange}
                        placeholder='Enter Username'/>

                        {formErrors.password.length > 0 ? <P className='error'>{formErrors.password} </P> : null}
                        <input
                        type='password'
                        name='password'
                        value={loginForm.password}
                        onChange={onChange}
                        placeholder='Enter Password'/>

                        {loggingIn && <p>Logging In...</p>}
                        {disabled === true ? <button className="btn-disabled" disabled={disabled}>Confirm</button> : <button className="btn" disabled={disabled}>Confirm</button>}
                    </form>
                    <span className='form-bottom'>No Account? <Link className='link' to='/signup'>Sign up here</Link></span>
                </div>
                {localStorage.getItem('token') && <Redirect to="/homepage" />}
            </FormContainerDiv>
        </LoginDiv>
    )

}

export { Login };
