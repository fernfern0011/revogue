import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth';
import { authOption } from '../api/auth/[...nextauth]/route';
import RegisterForm from '../components/RegisterForm';

export default async function Form() {

    const session = await getServerSession(authOption);

    if (session) {
        redirect("/")
    }

    return <RegisterForm />
}