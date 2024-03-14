import { Product } from "@/types";
import { create } from "zustand";
interface PreviewModal {
    isOpen: boolean;
    data?: Product;
    role: number;
    onOpen: (data: Product, role: number) => void;
    onClose: () => void;
}

const usePreviewModal = create<PreviewModal>((set) => ({
    isOpen: false,
    data: undefined,
    role: 1,
    onOpen: (data: Product, role: number) => set({ data, isOpen: true, role }),
    onClose: () => set({ isOpen: false, data: undefined })
}))

export default usePreviewModal;