import { ProductManage } from "@/types";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/get-all-product`;


const getAllProduct = async (): Promise<ProductManage[]> => {
    try {
        const res = await axios.get(API_URL);
        return res?.data;
    } catch (err) {
        throw err
    }

}

export default getAllProduct;