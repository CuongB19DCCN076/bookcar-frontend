import { ProductFormValues } from "@/app/(routes)/(manage)/manage-product/[productId]/components/product-form";
import axiosInstance from "@/lib/config-axios";

const API_URL = `/user/get-product`;

const getProductById = async (id: string): Promise<ProductFormValues> => {
    try {
        const res = await axiosInstance.get(`${API_URL}/${id}`);
        return res?.data;
    } catch (err) {
        throw err
    }
}

export default getProductById;