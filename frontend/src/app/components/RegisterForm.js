"use client";
import Link from "next/link";
import validator from 'validator';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button } from 'react-bootstrap';
import "../styles/RegisterForm.css";

export default function RegisterForm() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        var err = 0, falseInput = false;

        // nameRegex: Alphabets with 4 different special characters allowed.
        // passwordRegex: 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character & at least 8 characters
        const nameRegex = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
        const passwordRegex = new RegExp(/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/);

        // If it does not fulfil the name regex
        if (nameRegex.test(username) == false) {
            err += 1;
            setError((prevError) => {
                prevError.username = true;
                return ({ ...prevError });
            });
            falseInput = true;
        };

        // If input is not an email
        if (validator.isEmail(email) == false) {
            err += 1;
            setError((prevError) => {
                prevError.email = true;
                return ({ ...prevError });
            });
            falseInput = true;
        };

        // If input does not pass the password requirement
        if (passwordRegex.test(password) == false) {
            err += 1;
            setError((prevError) => {
                prevError.password = true;
                return ({ ...prevError });
            });
            falseInput = true;
        };

        if (err === 0) {
            const res = await fetch(`${process.env.backendUrl}/api/account/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: e.target.username.value,
                    accemail: e.target.email.value,
                    accpass: e.target.password.value
                }),
            }).catch(error => { console.log(error); });

            const status = await res.status;

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
        <div className="centered-container">
            <form className="flex flex-col gap-2 mx-auto max-w-md mt-10" method="POST" onSubmit={handleSubmit}>
                <h1 className="login my-4">Register</h1>
                <label className="custom-label" htmlFor="username">Username</label>
                <input
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="text"
                id="username"
                className="custom-container"
                required
                />
                {error.username && <p>Username cannot be empty/have a number</p>}
                <label className="custom-label" htmlFor="email">Email</label>
                <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="text"
                id="email"
                className="custom-container"
                required
                />
                {error.email && <p>Please key in a valid email</p>}
                <label className="custom-label" htmlFor="password">Password</label>
                <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="custom-container"
                required
                />
                {error.password && (
                <div>
                    <span>Password needs to have:</span>
                    <ul>
                    <li>Use uppercase & lowercase letter,</li>
                    <li>1 number,</li>
                    <li>1 special character,</li>
                    <li>at least 8 characters</li>
                    </ul>
                </div>
                )}

                <Button className="register-button custom-container" type="submit">
                Register
                </Button>
                <div className="custom-container-register">
                <p className="dont-have-account">Already have an account? </p>
                <Link className="text-sm mt-3 text-right" href="/login">
                    <span className="register">Login here</span>
                </Link>
                </div>
            </form>
        </div>

    );
}