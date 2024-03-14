import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/get-owner-name`;

const getOwnerName = async () => {
    try {
        const res = await axios.get(`${API_URL}`);
        return res;
    } catch (err) {
        throw err
    }
}

export default getOwnerName;