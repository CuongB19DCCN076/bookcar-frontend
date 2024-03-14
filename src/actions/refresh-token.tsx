import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`;

interface IAccessToken {
    access_token: string | null
}

const refreshToken = async (data: IAccessToken) => {
    try {
        const res = await axios.post(API_URL, data);
        return res;
    } catch (err) {
        throw err
    }
}

export default refreshToken;