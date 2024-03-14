import { SignUp } from "@/types";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up-seller`;
const API_URL2 = `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`;

const signUpUser = async (data: SignUp) => {
    try {
        if (data.role == "Seller") {
            const res = await axios.post(API_URL, data);
            return res;
        }
        else {
            const res = await axios.post(API_URL2, data);
            return res;
        }
    } catch (err) {
        throw err
    }
}

export default signUpUser;