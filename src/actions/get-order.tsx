import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/get-product`;

const getProductById = async (id: string) => {
    try {
        const res = await axios.get(`${API_URL}/${id}`);
        return res?.data;
    } catch (err) {
        throw err
    }
}

export default getProductById;