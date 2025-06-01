import {arrayUnion, doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "@/firebase";


export const addMovieToFavorite = async ({movie_id, email}: {movie_id: string, email: string | null | undefined}) => {
    if (!movie_id || !email) return null;
    const userRef = doc(db, "users", email);

    try {
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            await setDoc(userRef, {favorite_list: arrayUnion(movie_id)}, { merge: true });
        }

        return { success: true };
    } catch (error) {
        console.error("Firebase sign-in error:", error);
        return { success: false, error };
    }
}

export const addMovieToWatched = async ({movie_id, email}: {movie_id: string, email: string | null | undefined}) => {
    if (!movie_id || !email) return null;
    const userRef = doc(db, "users", email);

    try {
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            await setDoc(userRef, {watched_list: arrayUnion(movie_id)}, { merge: true });
        }

        return { success: true };
    } catch (error) {
        console.error("Firebase sign-in error:", error);
        return { success: false, error };
    }
}

export const addMovieToWatchLater = async ({movie_id, email}: {movie_id: string, email: string | null | undefined}) => {
    if (!movie_id || !email) return null;
    const userRef = doc(db, "users", email);

    try {
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            await setDoc(userRef, {watch_later_list: arrayUnion(movie_id)}, { merge: true });
        }

        return { success: true };
    } catch (error) {
        console.error("Firebase sign-in error:", error);
        return { success: false, error };
    }
}