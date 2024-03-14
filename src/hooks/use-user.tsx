import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface dataUser {
    email: string,
    role: string,
    id_store: string
}

interface CartStore {
    email: string;
    role: string;
    id_store?: string;
    addUser: (data: string) => void;
    addIdStore: (id: string) => void;
    removeUser: () => void;
    addRole: (role: string) => void;
    addAllUser: (data: dataUser) => void;
}

const useUser = create(
    persist<CartStore>(
        (set, get) => ({
            email: "",
            role: "",
            id_store: "",
            addUser: (data: string) => {
                set({ email: data });
            },
            removeUser: () => {
                set({ email: "", role: "" })
            },
            addIdStore: (id: string) => {
                set({ id_store: id })
            },
            addRole: (role: string) => {
                set({ role: role })
            },
            addAllUser: (data: dataUser) => {
                set({ role: data.role, email: data.email, id_store: data.id_store })
            }
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)

export default useUser;
