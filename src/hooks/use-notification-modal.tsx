import { Notice } from "@/types";
import { create } from "zustand";
interface NotificationModal {
    isOpen: boolean;
    data?: Notice;
    onOpen: (data: Notice) => void;
    onClose: () => void;
}

const useNotificationModal = create<NotificationModal>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data: Notice) => set({ data, isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useNotificationModal;