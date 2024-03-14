import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/update-order`;

const updateOrder = async (id: string | undefined, data: { status: string }) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, data);
        return res;
    } catch (err) {
        throw err
    }
}

export default updateOrder;