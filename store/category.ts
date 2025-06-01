import { list_type } from '@/types/Lists';
import { create } from 'zustand';

interface State {
    activeCategory: list_type;
    setActiveCategory: (activeId: list_type) => void;
}

export const useCategoryStore = create<State>((set) => ({
    activeCategory: list_type.now,
    setActiveCategory: (activeCategory) => set({ activeCategory }),
}));
