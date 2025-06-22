import {arrayRemove, arrayUnion, doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "@/firebase";
import {MOVIE_LIST_TYPES} from "@/shared/movie-card-actions";
import {IMovieDetailsResponse, IMovieSendData} from "@/types/Movie";
import {getActionType} from "@/utils/getActionType";
import IUser from "@/types/User";

interface AddMovieToListParams {
    movie: IMovieSendData;
    email: string | null | undefined;
    type: MOVIE_LIST_TYPES;
}


export const addMovieToUserList = async ({ movie, email, type }: AddMovieToListParams) => {
    if (!movie || !email || !type) return null;
    const userRef = doc(db, "users", email);

    const obj = {
        title: movie.title,
        id: movie.id,
        poster_path: movie.poster_path,
    };

    switch (type) {
        case "favorite_list":
            await setDoc(userRef, { watched_list: arrayUnion(obj) }, { merge: true });
            await setDoc(userRef, { watch_later_list: arrayRemove(obj) }, { merge: true });
            break;
        case "watch_later_list":
            await setDoc(userRef, { watched_list: arrayRemove(obj) }, { merge: true });
            await setDoc(userRef, { favorite_list: arrayRemove(obj) }, { merge: true });
            break;
        case "watched_list":
            await setDoc(userRef, { watch_later_list: arrayRemove(obj) }, { merge: true });
            break;
    }

    try {
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) return null;

        const listName = getActionType(type);
        const operation = type.startsWith("remove_") ? arrayRemove : arrayUnion;

        await setDoc(userRef, { [listName]: operation(obj) }, { merge: true });

        return { success: true };
    } catch (error) {
        console.error("Firebase update error:", error);
        return { success: false, error };
    }
};


export const addRuntime = async ({user, data, user_value}: {user: IUser, data: IMovieDetailsResponse, user_value: string}) => {
    if (!user || !data || !user_value) return null;
    const userRef = doc(db, "users", user.email);

    const obj = {
        title: data.title,
        id: data.id,
        poster_path: data.poster_path,
        runtime: data.runtime,
        user_runtime: user_value
    };

    try {
        const isHave = user.not_finished?.some(item => item.id === data.id);

        if (isHave) {
            const newArray = user.not_finished?.filter(item => item.id !== data.id) || []
            const updatedArray = [...newArray, obj];

            await setDoc(userRef, { not_finished: updatedArray }, { merge: true });
        } else {
            await setDoc(userRef, { not_finished: arrayUnion(obj) }, { merge: true });
        }

    } catch (error) {
        console.error("Firebase update error:", error);
    }
}


