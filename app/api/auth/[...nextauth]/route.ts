import Nextauth from "next-auth";
import {authConfig} from "@/configs/auth";

const handler = Nextauth(authConfig);

export { handler as GET, handler as POST };