import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/update-product`;

const putProductById = async (id: string | string[], data: any) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, data);
        return res?.data;
    } catch (err) {
        throw err
    }
}

export default putProductById;