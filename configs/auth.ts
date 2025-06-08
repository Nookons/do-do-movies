import {AuthOptions, User} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import {checkEmailAvailable} from "@/utils/checkEmailAvailable";
import {decrypt} from "@/utils/encrypt";

export const authConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        Credentials({
            credentials: {
                email: {label: "email", type: 'email', required: true},
                password: {label: "password", type: 'password', required: true},
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error("It appears that some of the required inputs have not yet been completed.")
                    return null
                }


                const server_user = await checkEmailAvailable(credentials.email)

                console.log(credentials);
                console.log(server_user);

                if (server_user) {
                    const server_password = decrypt(server_user.password)

                    if (server_password === credentials.password) {
                        const {password, ...user} = server_user;

                        return user as User
                    } else {
                        throw new Error("It appears that the password entered is not valid.")
                    }
                }

                return null
            }
        })
    ],

    // correct cookies for iPhone/Safari
    // Safari (особенно iOS) требует `SameSite: 'none'` + `Secure: true`
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            },
        },
    },

    callbacks: {
        async session({ session, token, user }) {
            // Можно добавить кастомные поля в session
            return session;
        },
    },

    // Убедись, что ты работаешь через HTTPS (особенно в продакшене)
    session: {
        strategy: 'jwt',
    },

    pages: {
        error: '/auth/error', // кастомная страница ошибки авторизации
        signIn: "/sign-in"
    },
};
