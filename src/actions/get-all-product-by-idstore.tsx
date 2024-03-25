import axiosInstance from "@/lib/config-axios";

const API_URL = `/auth/get-all-product-by-idstore`;

interface getProductProps {
    id: Number
}

const getAllProductByIdStore = async (data: getProductProps) => {
    try {
        const res = await axiosInstance.post(API_URL, data);
        return res;
    } catch (err) {
        throw err
    }
}

export default getAllProductByIdStore;