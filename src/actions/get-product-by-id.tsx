import axiosInstance from "@/lib/config-axios";
import { z } from "zod";
const formSchema = z.object({
    name: z.string().min(2),
    start_address: z.string().min(1),
    images: z.object({ image_url: z.string() }).array(),
    end_address: z.string().min(1),
    start_time: z.string().min(1),
    end_time: z.string().min(1),
    license_plates: z.string().min(1),
    phone_number: z.string().min(1),
    phone_number2: z.string().min(1),
    description: z.string().min(1),
    policy: z.string().min(1),
    price: z.number().or(z.string()),
    remain_seat: z.number().or(z.string()),
    type: z.string().min(1),
    utilities: z.string().min(1),
    status: z.string().default("Hiện")
})

type ProductFormValues = z.infer<typeof formSchema>;
const API_URL = `/auth/get-product`;

const getProductById = async (id: string): Promise<ProductFormValues> => {
    try {
        const res = await axiosInstance.get(`${API_URL}/${id}`);
        return res?.data;
    } catch (err) {
        throw err
    }
}

export default getProductById;