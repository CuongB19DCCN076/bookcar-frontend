import axiosInstance from "@/lib/config-axios";

const API_URL = `/auth/delete-product`;

const deleteProductById = async (id: string | string[]) => {
    try {
        const res = await axiosInstance.delete(`${API_URL}/${id}`);
        return res?.data;
    } catch (err) {
        throw err
    }
}

export default deleteProductById;