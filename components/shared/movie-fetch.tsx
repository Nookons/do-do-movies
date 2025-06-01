import { getMovies } from "@/components/getMovies";
import IMoviesResponse from "@/types/Movie";
import MovieGroup from "@/components/shared/movie-group";
import {Skeleton} from "@/components/ui";
import {list_type} from "@/types/Lists";

interface Props {
    fetch_type: list_type;
}

const ServerMovieFetch = async ({ fetch_type }: Props) => {
    const movies_data: IMoviesResponse | null = await getMovies({ fetch_type });

    if (!movies_data || !movies_data.results) {
        return <Skeleton />;
    }

    return <MovieGroup fetch_type={fetch_type} result={movies_data.results} />
};

export default ServerMovieFetch;
