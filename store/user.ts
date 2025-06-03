import { create } from 'zustand';
import IUser from "@/types/User";

interface State {
    data: IUser | null;
    setUserData: (data: IUser) => void;
}

export const useUserStore = create<State>((set) => ({
    data: null,
    setUserData: (data) => set({ data }),
}));
