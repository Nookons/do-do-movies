import { Session } from "next-auth";
import {decrypt, encrypt} from "@/utils/encrypt";
import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp,
} from "firebase/firestore";
import {db} from "@/firebase";

export const userSignIn = async (props: Session) => {
    if (!props.user || !props.user.email) return null;

    const email = props.user.email;
    const generate_id = encrypt(Date.now().toString());
    const userRef = doc(db, "users", email);

    try {
        const docSnap = await getDoc(userRef);

        const userData = {
            email,
            name: props.user.name || null,
            image: props.user.image || null,
            updatedAt: serverTimestamp(),
            type: "otherService",
            password: "none"
        };

        if (docSnap.exists()) {
            await setDoc(userRef, userData, { merge: true });
        } else {
            await setDoc(userRef, {
                ...userData,
                id: generate_id,
                createdAt: serverTimestamp(),
            });
        }

        return { success: true };
    } catch (error) {
        console.error("Firebase sign-in error:", error);
        return { success: false, error };
    }
};
