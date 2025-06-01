import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export const getUserId = async (email: string): Promise<string | null> => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
        return doc.data().id; // если тебе нужен Firestore document ID
    }

    return null; // если пользователь не найден
};
