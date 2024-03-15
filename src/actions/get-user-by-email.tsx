import axiosInstance from "@/lib/config-axios";

const API_URL = `/auth/get-store`;

interface IEmail {
    emailUser: string | null
}

const getUserByEmail = async (data: IEmail) => {
    try {
        const res = await axiosInstance.post(API_URL, data);
        return res;
    } catch (err) {
        throw err
    }
}

export default getUserByEmail;