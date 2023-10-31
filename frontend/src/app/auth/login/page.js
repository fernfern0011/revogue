"use client";
import React, { useState } from 'react';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
    const router = useRouter();
    // const { data: session, status } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, password);

        signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
        }).then((res) => {
            if (res.ok) {
                console.log("Successful login");
                router.push('/')
            } else {
                setError("email", { "message": res?.error ?? "Unable to login.", type: "error" })
            }
        })
    }


    // if (status == "loading") {
    //     return null;
    // }

    // if (status == "authenticated") {
    //     router.push('/')
    // }

    return (
        <>
            <Row className='justify-content-center pt-5'>
                <Col className='col-6 row-cols-12'>
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
                            <Form.Text className="text-danger">{error.email?.message}</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                            <Form.Text className="text-danger">{error.password?.message}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
}
export default Login;