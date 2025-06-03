import React from 'react';
import {IMovieDetailsResponse, IMovieResponse, IMovieSendData} from "@/types/Movie";
import { addMovieToUserList } from "@/utils/movie/movieActions";
import { toast } from "sonner";
import {
    BookmarkMinus,
    BookmarkPlus,
    CircleCheckBig,
    CircleOff,
    HeartMinus,
    HeartPlus
} from "lucide-react";
import { useUserStore } from "@/store/user";
import { Button } from "@/components/ui";
import {getActionType} from "@/utils/getActionType";


export const MOVIE_LIST_TYPES = {
    FAVORITE: 'favorite_list',
    WATCHED: 'watched_list',
    WATCH_LATER: 'watch_later_list',
    REMOVE_FAVORITE: 'remove_favorite_list',
    REMOVE_WATCHED: 'remove_watched_list',
    REMOVE_WATCH_LATER: 'remove_watch_later_list',
} as const;

export type MOVIE_LIST_TYPES = typeof MOVIE_LIST_TYPES[keyof typeof MOVIE_LIST_TYPES];


const MovieCardActions = ({ movie_data }: { movie_data: IMovieResponse | IMovieDetailsResponse }) => {
    const user_store = useUserStore(state => state.data);

    const movie: IMovieSendData = {
        id: movie_data.id,
        title: movie_data.title,
        poster_path: movie_data.poster_path,
    };

    const isFavorite = user_store?.favorite_list?.some((m) => m.id === movie_data.id);
    const isWatched = user_store?.watched_list?.some((m) => m.id === movie_data.id);
    const isWatchLater = user_store?.watch_later_list?.some((m) => m.id === movie_data.id);


    const onActionHandler = async (e: React.MouseEvent<HTMLButtonElement>, type: MOVIE_LIST_TYPES) => {
        e.preventDefault();
        e.stopPropagation();

        if (!movie_data) return;
        if (!user_store?.email) {
            toast.error(`You not logged in!`);
            return;
        }

        try {
            const result = await addMovieToUserList({ movie, email: user_store.email, type});

            if (result?.success) {
                const action_type = getActionType(type)
                const operation = action_type.startsWith("remove_")

                if (operation) {
                    toast.success(`${movie_data.title} note successfully removed!`);
                } else  {
                    toast.success(`${movie_data.title} note successfully added`);
                }

            } else {
                toast.error(`Can't add this movie: ${movie_data.title}`);
            }
        } catch (error) {
            toast.error(`Something went wrong while adding movie: ${movie_data.title}`);
            console.error(error);
        }
    };

    return (
        <div className="flex gap-2 justify-end items-center">
            {isFavorite
                ?
                <Button variant={'outline'} className={`text-primary`} aria-label="Add to favorite"
                        onClick={(e) => onActionHandler(e, MOVIE_LIST_TYPES.REMOVE_FAVORITE)}>
                    <HeartMinus/>
                </Button>
                :
                <Button aria-label="Add to favorite" onClick={(e) => onActionHandler(e, MOVIE_LIST_TYPES.FAVORITE)}
                        variant="outline">
                    <HeartPlus/>
                </Button>

            }
            {isWatched
                ?
                <Button variant={'outline'} className={`text-primary`} aria-label="Add to favorite"
                        onClick={(e) => onActionHandler(e, MOVIE_LIST_TYPES.REMOVE_WATCHED)}>
                    <CircleOff/>
                </Button>
                :
                <Button aria-label="Mark as watched" onClick={(e) => onActionHandler(e, MOVIE_LIST_TYPES.WATCHED)}
                        variant="outline">
                    <CircleCheckBig/>
                </Button>
            }
            {isWatchLater
                ?
                <Button variant={'outline'} className={`text-primary`} aria-label="Add to favorite"
                        onClick={(e) => onActionHandler(e, MOVIE_LIST_TYPES.REMOVE_WATCH_LATER)}>
                    <BookmarkMinus/>
                </Button>
                :
                <Button aria-label="Add to watch later"
                        onClick={(e) => onActionHandler(e, MOVIE_LIST_TYPES.WATCH_LATER)} variant="outline">
                    <BookmarkPlus/>
                </Button>
            }
           {/* <div>
                <Button
                    className={`flex min-w-[140px] group cursor-pointer justify-center overflow-hidden relative items-center gap-2`}
                >
                    <HandCoins className={`group-hover:opacity-0 opacity-100 transition`}/>
                    <b className={`group-hover:opacity-0 opacity-100 group-hover:translate-x-2 duration-500 transition`}>12.34$</b>
                    <b className={`group-hover:opacity-100 opacity-0 absolute -translate-x-4 duration-500 group-hover:translate-x-0 flex items-center gap-1 transition`}>
                        Add in cart <ArrowRight/>
                    </b>
                </Button>
            </div>*/}
        </div>
    );
};

export default MovieCardActions;
