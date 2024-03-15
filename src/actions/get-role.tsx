import axiosInstance from "@/lib/config-axios";
const API_URL = `/auth/get-role`;

const getRole = async (email: string) => {
    try {
        const res = await axiosInstance.get(`${API_URL}/${email}`);
        return res;
    } catch (err) {
        throw err
    }
}

export default getRole;