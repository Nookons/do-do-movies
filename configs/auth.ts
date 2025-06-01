import type {AuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export const authConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID_GOOGLE!,
            clientSecret: process.env.CLIENT_SECRET_GOOGLE!,
        })
    ]
}