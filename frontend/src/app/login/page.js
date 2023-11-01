import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth';
import { authOption } from '../api/auth/[...nextauth]/route';
import LoginForm from "../components/LoginForm";

export default async function Login() {
    const session = await getServerSession(authOption);

    if (session) {
        redirect("/")
    }

    return <LoginForm />
}