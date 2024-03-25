import axiosInstance from "@/lib/config-axios";

const API_URL = `/auth/get-all-order-by-email-user`;

const getAllOrderByEmailUser = async (idStore: string | undefined) => {
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

export default getAllOrderByEmailUser;