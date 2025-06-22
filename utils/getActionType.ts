import {MOVIE_LIST_TYPES} from "@/shared/movie-card-actions";

export const getActionType = (type: MOVIE_LIST_TYPES): string => {
    if (type.startsWith("remove_")) {
        return type.replace("remove_", ""); // e.g., "remove_favorite_list" → "favorite_list"
    }
    return type;
};