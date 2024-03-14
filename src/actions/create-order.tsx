import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/create-order`;

const createOrder = async (data: any) => {
    try {
        const res = await axios.post(API_URL, data);
        return res;
    } catch (err) {
        throw err
    }
}

export default createOrder;