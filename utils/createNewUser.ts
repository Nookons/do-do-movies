import {encrypt} from "@/utils/encrypt";
import {serverTimestamp} from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import {db} from "@/firebase";

interface props {
    email: string;
    password: string;
}

export const createNewUser = async (data: props) => {
    if (!data || !data.email || !data.password) return null

    const obj = {
        email: data.email,
        password: encrypt(data.password),
        type: "credentials",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        name: "",
        image: "https://www.inspireflowers.ca/wp-content/uploads/sites/376/2021/08/noimg.png",
        id: encrypt(data.email),
    }

    try {
        await setDoc(doc(db, "users", data.email), {
            ...obj
        });
        return true
    } catch (error) {
        console.error(error);
        return null;
    }

    return null
}