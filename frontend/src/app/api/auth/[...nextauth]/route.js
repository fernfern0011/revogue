import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Enter your email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password"
                }
            },
            async authorize(credentials) {

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ accemail: credentials.email, accpass: credentials.password })
                });

                const user = await res.json();

                if (res.ok && user) {
                    return user;
                };

                //login failed
                return null;
            },
        }),
    ], pages: {
        signIn: "/signin",
    }
})

export { handler as GET, handler as POST };