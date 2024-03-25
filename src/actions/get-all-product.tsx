import axiosInstance from "@/lib/config-axios";

const API_URL = `/auth/get-all-product-pagi`;


const getAllProduct = async (page: string | null) => {
    try {
        const res = await axiosInstance.get(`${API_URL}/${page}`);
        return res?.data;
    } catch (err) {
        throw err
    }

}

export default getAllProduct;