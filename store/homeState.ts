import { create } from 'zustand';
import IMoviesResponse from "@/types/Movie";

interface State {
    data: IMoviesResponse;
    setFilteredMovie: (data: IMoviesResponse) => void;
}

export const useHomeState = create<State>((set) => ({
    data: {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0
    },
    setFilteredMovie: (data) => set({ data }),
}));
