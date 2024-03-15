import axiosInstance from "@/lib/config-axios";
import { ProductManage } from "@/types";

const API_URL = `/user/get-all-product`;


const getAllProduct = async (): Promise<ProductManage[]> => {
    try {
        const res = await axiosInstance.get(API_URL);
        return res?.data;
    } catch (err) {
        throw err
    }

}

export default getAllProduct;