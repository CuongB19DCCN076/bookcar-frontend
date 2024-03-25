import axiosInstance from "@/lib/config-axios";

const API_URL = `/auth/get-all-order-by-id-store`;

const getAllOrderByIdStore = async (idStore: string | undefined) => {
    try {
        const res = await axiosInstance.get(`${API_URL}/${idStore}`);
        if (res?.status === 200) {
            return res?.data;
        } else {
            return [];
        }
    } catch (err) {
        throw err
    }
}

export default getAllOrderByIdStore;