"use client"
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "../styles/LoginForm.css";


export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                callbackUrl: `/`,
                redirect: false,
            });

            res?.error === "CredentialsSignin" ? setError("Incorrect Password or Email") : '';
            res.url ? router.push(res.url) : '';

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            
            <div className="p-5">
                <h1 className="login my-4">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center">
                    <div className="custom-container">
                        <label className="custom-label">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className="custom"
                        />
                    </div>
                    <div className="custom-container">
                        <label className="custom-label">Password</label>
                        <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="custom"
                        />
                    </div>
                    <div className="custom-container">
                        <button className="login-button px-6 py-2">
                        Login
                        </button>
                    </div>
                    {error && (
                        <div className="bg-red-500 w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                        </div>
                    )}
                    <div className="custom-container-register">
                        <p className="dont-have-account">Don't have an account? </p>
                        <Link className="text-sm mt-3 text-right" href="/register">
                        <span className="register">Register</span>
                        </Link>
                    </div>
                    </form>
            </div>
        </div>

        
    );
}