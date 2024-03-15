import axiosInstance from "@/lib/config-axios";
import { SignIn } from "@/types";

const API_URL = `/auth/sign-in`;

const signInUser = async (data: SignIn) => {
    try {
        const res = await axiosInstance.post(API_URL, data);
        return res;
    } catch (err) {
        throw err
    }
}

export default signInUser;