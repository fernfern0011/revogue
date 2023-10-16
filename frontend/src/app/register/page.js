'use client';
import React, { useState } from 'react';
import validator from 'validator';
import { useRouter } from 'next/navigation'

export default function Form() {
    const router = useRouter()
    const [error, setError] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        var err = 0, falseInput = false;

        // nameRegex: Alphabets with 4 different special characters allowed.
        // passwordRegex: 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character & at least 8 characters
        const nameRegex = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
        const passwordRegex = new RegExp(/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/);

        // If it does not fulfil the name regex
        if (nameRegex.test(e.target.username.value) == false) {
            err += 1;
            setError((prevError) => {
                prevError.username = true;
                return ({ ...prevError });
            });
            falseInput = true;
        };

        // If input is not an email
        if (validator.isEmail(e.target.email.value) == false) {
            err += 1;
            setError((prevError) => {
                prevError.email = true;
                return ({ ...prevError });
            });
            falseInput = true;
        };

        // If input does not pass the password requirement
        if (passwordRegex.test(e.target.password.value) == false) {
            err += 1;
            setError((prevError) => {
                prevError.password = true;
                return ({ ...prevError });
            });
            falseInput = true;
        };

        if (err === 0) {
            const res = await fetch(`http://localhost:5000/api/account/create`, {
                body: JSON.stringify({
                    username: e.target.username.value,
                    accemail: e.target.email.value,
                    accpass: e.target.password.value
                }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).catch(error => { console.log(error); });

            const status = await res.status;
            console.log(status);

            switch (status) {
                case 201:
                    router.push('/login');
                    break;
                case 409:
                    setError(true);
                    alert('Account is already existed')
                    // setSnackbar({ children: 'Teacher already existed', severity: 'error' });
                    break;
                default:
                    setError(true);
                    alert('Failed to create an account')
                    // setSnackbar({ children: 'Teacher cannot be added', severity: 'error' });
                    break;
            };
        }

    };
    return (
        <form
            className="flex flex-col gap-2 mx-auto max-w-md mt-10"
            method='post'
            onSubmit={handleSubmit}
        >
            <label htmlFor='username'>Username</label>
            <input
                name="username" type="text" id="username" required
            />
            {(error.username && <p>Username cannot be empty/have a number</p>)}
            <br />
            <label htmlFor='email'>Email</label>
            <input
                name="email" type="text" id="email" required
            />
            {(error.email && <p>Please key in a valid email</p>)}
            <br />
            <label htmlFor='password'>Password</label>
            <input
                type="password" id="password" required
            />
            {(error.password && <p>Password needs to have:
                <ul>
                    <li>Use uppercase &amp; lowercase letter,</li>
                    <li>1 number,</li>
                    <li>1 special character,</li>
                    <li>at least 8 characters</li>
                </ul></p>)
            }
            <br />
            <button type="submit">Register</button>
        </form>
    );
}