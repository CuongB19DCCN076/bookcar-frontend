import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/delete-product`;

const deleteProductById = async (id: string | string[]) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`);
        return res?.data;
    } catch (err) {
        throw err
    }
}

export default deleteProductById;