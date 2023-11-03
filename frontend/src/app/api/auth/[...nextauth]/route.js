import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

let userEmail = null;

export const authOption = {
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

                const res = await fetch(`https://revogue-backend.vercel.app/api/account/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ accemail: credentials.email, accpass: credentials.password })
                });

                const user = await res.json();

                if (res.ok && user) {
                    userEmail = credentials.email;
                    return user;
                };

                //login failed
                return null;
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            // first time jwt callback is run, user object is available
            if (user) {
                token.accessToken = user.token;
                token.id = user.result.accid;
                token.name = user.result.username;
                token.email = user.result.accemail;
            };

            return token;
        },
        session: async ({ session, token }) => {
            session.accessToken = token.accessToken;

            if (session?.accessToken) {
                const res = await fetch(`https://revogue-backend.vercel.app/api/user-profile?accid=${token.id}`, {
                    headers: { "Content-Type": "application/json" }
                });

                const data = await res.json();

                if (data) {
                    session.id = token.id;
                    session.image = "data.uprofileimage";
                }
            };

            return session;
        }
    },
    session: {
        jwt: true,
        maxAge: 60 * 60 * 24 // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn:
        {
            error: "Invalid email or password",
            status: 200,
            ok: true,
        }
    }
}

const handler = NextAuth(authOption);

export {userEmail} 

export { handler as GET, handler as POST };