import React from 'react';
import {useRef, useState} from "react";

const Register = () => {
    const usernameIn = useRef()
    const passOneIn = useRef()
    const passTwoIn = useRef()
    const [error, setError] = useState()

    function register () {
        const userData = {
            name: usernameIn.current.value,
            passwordOne: passOneIn.current.value,
            passwordTwo: passTwoIn.current.value,
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };
        fetch('http://167.99.138.67:1111/createaccount', options)
            .then(res => res.json())
            .then(data => {
                if (!data.success) {
                    setError(data.message)
                }else {
                    setError(data.message)
                }
            })
    }


    return (
        <div className='form'>
            <h1>Registracija</h1>
            <div className='formCont'>
                <p>Vartotojo vardas:</p>
                <input ref={usernameIn} type="text"/>
            </div>
            <div className='formCont'>
                <p>Slaptažodis:</p>
                <input ref={passOneIn} type="password"/>
            </div>
            <div className='formCont'>
                <p>Pakartoti slaptažodį:</p>
                <input ref={passTwoIn} type="password"/>
            </div>
            <p className='error'>{error}</p>
            <div onClick={register} className='button'>Register</div>
        </div>
    );
};

export default Register;