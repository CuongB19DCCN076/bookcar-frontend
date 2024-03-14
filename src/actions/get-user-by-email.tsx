import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/get-store`;

interface IEmail {
    emailUser: string | null
}

const getUserByEmail = async (data: IEmail) => {
    try {
        const res = await axios.post(API_URL, data);
        return res;
    } catch (err) {
        throw err
    }
}

export default getUserByEmail;