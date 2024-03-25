import axiosInstance from "@/lib/config-axios";

const API_URL = `/auth/create-order`;

const createOrder = async (data: any) => {
    try {
        const res = await axiosInstance.post(API_URL, data);
        return res;
    } catch (err) {
        throw err
    }
}

export default createOrder;