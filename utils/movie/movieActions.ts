import {arrayRemove, arrayUnion, doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "@/firebase";
import {MOVIE_LIST_TYPES} from "@/components/shared/movie-card-actions";
import { IMovieSendData } from "@/types/Movie";
import {getActionType} from "@/utils/getActionType";

interface AddMovieToListParams {
    movie: IMovieSendData;
    email: string | null | undefined;
    type: MOVIE_LIST_TYPES;
}


export const addMovieToUserList = async ({ movie, email, type }: AddMovieToListParams) => {
    if (!movie || !email || !type) return null;
    const userRef = doc(db, "users", email);

    try {
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) return null;

        const obj = {
            title: movie.title,
            id: movie.id,
            poster_path: movie.poster_path,
        };

        const listName = getActionType(type);
        const operation = type.startsWith("remove_") ? arrayRemove : arrayUnion;

        await setDoc(userRef, { [listName]: operation(obj) }, { merge: true });

        return { success: true };
    } catch (error) {
        console.error("Firebase update error:", error);
        return { success: false, error };
    }
};


export const addCategoryCount = async ({email, movie}: {email: string, movie: IMovieSendData}) => {
    console.log(email);
    console.log(movie);
}


