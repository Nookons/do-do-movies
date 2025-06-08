import {db} from "@/firebase";
import {collection, query, where, getDocs} from "firebase/firestore";

export const checkEmailAvailable = async (email: string) => {
    try {
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return {...doc.data()};
        }

        return null; // Нет такого email
    } catch (error) {
        console.error("checkEmailAvailable error:", error);
        throw new Error("Failed to check email availability");
    }
}