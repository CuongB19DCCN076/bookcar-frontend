import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/get-all-product-by-idstore`;

interface getProductProps {
    id: Number
}

const getAllProductByIdStore = async (data: getProductProps) => {
    try {
        const res = await axios.post(API_URL, data);
        return res;
    } catch (err) {
        throw err
    }
}

export default getAllProductByIdStore;