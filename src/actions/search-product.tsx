import axiosInstance from "@/lib/config-axios";
import queryString from "query-string"

const API_URL = `/auth/search`;

interface Query {
    key?: string | null,
    start_time?: string | null,
    start_address?: string | null,
    end_address?: string | null
}

const searchProducts = async (query: Query) => {
    try {
        const url = queryString.stringifyUrl({
            url: API_URL,
            query: {
                key: query.key,
                start_time: query.start_time,
                start_address: query.start_address,
                end_address: query.end_address,
            }
        }, { skipNull: true })
        const res = await axiosInstance.get(url);
        return res?.data;
    } catch (e) {

    }
}
export default searchProducts;