import {collection, query, where, getDocs, onSnapshot} from "firebase/firestore";
import { db } from "@/firebase";
import IUser from "@/types/User";

export const getUserFromServer = async (email: string): Promise<IUser | null> => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
        return doc.data() as IUser; // если тебе нужен Firestore document ID
    }

    return null;
};

export const getUserObserver = (email: string, onUpdate: (user: IUser | null) => void): (() => void) => {
    const q = query(collection(db, "users"), where("email", "==", email));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) {
            onUpdate(null);
            return;
        }

        const doc = querySnapshot.docs[0];
        onUpdate(doc.data() as IUser);
    });

    return unsubscribe;
};
