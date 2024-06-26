import React from 'react';
import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const usernameIn = useRef()
    const passwordIn = useRef()
    const [error, setError] = useState()
    const navigate = useNavigate();

    function login () {
        const userData = {
            name: usernameIn.current.value,
            password: passwordIn.current.value,
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };
        fetch('http://167.99.138.67:1111/login', options)
            .then(res => res.json())
            .then(data => {
                if (!data.success) {
                    setError(data.message)
                } else {
                    setError(data.message)
                    localStorage.setItem('secretKey', data.secretKey)
                    localStorage.setItem('username', usernameIn.current.value)
                    navigate('/')
                    window.location.reload()
                }
            })
    }


    return (
        <div className='form'>
            <h1>Prisijungti</h1>
            <div className='formCont'>
                <p>Vartotojo vardas:</p>
                <input ref={usernameIn} type="text"/>
            </div>
            <div className='formCont'>
                <p>Slaptažodis:</p>
                <input ref={passwordIn} type="password"/>
            </div>
            <p>{error}</p>
            <div onClick={login} className='button'>Prisijungti</div>
        </div>
    );
};

export default Login;