import axiosInstance from "@/lib/config-axios";

const API_URL = `/auth/add-product`;

const createProduct = async (data: any) => {
    try {
        const res = await axiosInstance.post(API_URL, data);
        return res;
    } catch (err) {
        throw err
    }
}

export default createProduct;