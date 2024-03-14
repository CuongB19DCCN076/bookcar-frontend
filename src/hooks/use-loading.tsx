import { create } from "zustand";

interface useLoadingProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useLoading = create<useLoadingProps>(set => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))