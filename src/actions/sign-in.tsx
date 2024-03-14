import { SignIn } from "@/types";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`;

const signInUser = async (data: SignIn) => {
    try {
        const res = await axios.post(API_URL, data);
        return res;
    } catch (err) {
        throw err
    }
}

export default signInUser;