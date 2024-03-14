import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/get-role`;

const getRole = async (email: string) => {
    try {
        const res = await axios.get(`${API_URL}/${email}`);
        return res;
    } catch (err) {
        throw err
    }
}

export default getRole;