import { create } from "zustand";

export interface ISidebarState {
    isOpen: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}
export const useSidebarStore = create<ISidebarState> () ((set) => ({
    isOpen: false,
    isMinimal: false,
    handleOpen: () => set((state) => ({ ...state, isOpen: true })),
    handleClose: () => set((state) => ({...state, isOpen: false})),
}))