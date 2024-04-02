"use client"
import * as z from "zod";
import { Trash } from 'lucide-react';
import toast from "react-hot-toast";
import React, { useCallback, useState } from 'react'
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/models/alert-model";
import ImageUpload from "@/components/ui/image-upload";
import Tiptap from "@/components/tiptap";
import createProduct from "@/actions/create-product";
import useUser from "@/hooks/use-user";
import putProductById from "@/actions/update-product";
import deleteProductById from "@/actions/delete-product";

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

export type ProductFormValues = z.infer<typeof formSchema>;

const ProductForm = ({ initialData }: {
    initialData: ProductFormValues | null
}) => {
    const { email } = useUser();
    const text = `<h5><strong>Chính sách nhà xe</strong></h5><h6><strong>Yêu cầu khi lên xe</strong></h6><ul><li>Không vứt rác trên xe</li><li>Không mang đồ ăn, thức ăn có mùi lên xe</li><li>Không hút thuốc, uống rượu, sử dụng chất kích thích trên xe</li><li>Không mang các vật dễ cháy nổ lên xe</li><li>Không làm ồn, gây mất trật tự trên xe</li></ul><h6><strong>Hành lý sách tay</strong></h6><ul><li>Tổng trọng lượng sách tay không quá 10kg</li></ul><h6><strong>Trẻ em và phụ nữ có thai</strong></h6><ul><li>Trẻ em dưới 3 tuổi hoặc dưới 110 cm được miễn phí vé nếu ngồi cùng ghế/giường với bố mẹ</li><li>Trẻ em từ 3 tuổi hoặc cao từ 110 cm trở lên mua vé như người lớn</li></ul><h6><strong>Động vật cảnh/thú cưng</strong></h6><ul><li>Nhận chở chó, mèo</li></ul>`
    const params = useParams();
    const route = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const title = initialData ? "Chỉnh sửa sản phẩm" : "Thêm mới sản phẩm";
    const description = initialData ? "Chỉnh sửa sản phẩm" : "Thêm mới sản phẩm";
    const toastMessage = initialData ? "Sản phẩm đã được chỉnh sửa." : "Sản phẩm đã được thêm mới.";
    const action = initialData ? "Sản phẩm đã được sửa" : "Thêm mới sản phẩm"
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            start_address: "",
            end_address: "",
            start_time: "",
            images: [],
            end_time: "",
            license_plates: "",
            phone_number: "",
            phone_number2: "",
            description: "",
            policy: "",
            price: 0,
            remain_seat: 0,
            type: "",
            utilities: "",
            status: "Hiện"
        }
    })
    const onSubmit = useCallback(async (data: ProductFormValues) => {
        setLoading(true);
        try {
            if (initialData) {
                await putProductById(params?.productId, { ...data, emailUser: email });
            } else {
                await createProduct({ ...data, emailUser: email });
            }
            route.push('/');
            toast.success(toastMessage);
        } catch (error) {
            toast.error('Có lỗi xảy ra.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [email, initialData, params?.productId, route, toastMessage]);

    const onDelete = useCallback(async () => {
        setLoading(true);
        try {
            await deleteProductById(params?.productId);
            route.refresh();
            route.push('/');
            toast.success('Product deleted.');
        } catch (error) {
            toast.error('An error occurred.');
            console.error(error);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }, [params?.productId, route]);
    const createInputField = (
        name: 'name' | 'start_address' | 'end_address' | 'start_time' | 'end_time' | 'license_plates' | 'phone_number' | 'phone_number2' | 'description' | 'policy' | 'price' | 'remain_seat' | 'type' | 'utilities' | 'status',
        label: string,
        type = "text",
        placeholder = "",
        additionalProps = {}
    ) => (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            disabled={loading}
                            type={type}
                            placeholder={placeholder}
                            {...field}
                            {...additionalProps}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
    const createTiptapField = (name: 'policy' | 'utilities' | 'description', label = '', description = '') => (
        <FormField control={form.control} name={name} render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <div className="flex items-center gap-x-4 w-full">
                        <Tiptap description={description !== '' ? text : field.value} onChange={field.onChange} />
                    </div>
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
    );

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading} />
            <div className='flex items-center justify-between'>
                <Heading
                    title={title}
                    description={description}
                />
                {initialData &&
                    <Button
                        variant={"destructive"}
                        size={"icon"}
                        onClick={() => setOpen(true)}
                    >
                        <Trash className='h-4 w-4' />
                    </Button>}
            </div>
            <Separator className="my-4" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 w-full"
                    method="POST"
                >
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hình ảnh</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value.map((image) => image.image_url)}
                                        disabled={loading}
                                        onChange={(url) => field.onChange([...field.value, { image_url: url }])}
                                        onRemove={(url) => field.onChange([...field.value.filter((current) => current.image_url !== url)])}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        {createInputField("name", "Tên vé", "text", "Tên vé...")}
                        {createInputField("start_address", "Địa điểm bắt đầu", "text", "Địa điểm bắt đầu...")}
                        {createInputField("end_address", "Địa điểm kết thúc", "text", "Địa điểm kết thúc...")}
                        {createInputField("start_time", "Thời gian bắt đầu", "time", "Thời gian bắt đầu...")}
                        {createInputField("end_time", "Thời gian kết thúc", "time", "Thời gian kết thúc...")}
                        {createInputField("remain_seat", "Số ghế trống", "text", "Nhập số trống...")}
                        {createInputField("license_plates", "Biển số xe", "text", "Nhập biển số xe...")}
                        {createInputField("type", "Kiểu xe", "text", "Nhập kiểu xe...")}
                        {createInputField("price", "Giá vé", "number", "Nhập giá vé...")}
                        <div className="col-span-3 grid grid-cols-3 gap-8">
                            {createInputField("phone_number", "Số điện thoại 1", "text", "Nhập số điện thoại 1")}
                            {createInputField("phone_number2", "Số điện thoại 2", "text", "Nhập số điện thoại 2")}
                        </div>
                        <div className="col-span-3 grid grid-cols-3 gap-x-4">
                            {createTiptapField("policy", "Chính sách", "1111")}
                            {createTiptapField("utilities", "Tiện ích chuyến xe")}
                            {createTiptapField("description", "Mô tả")}
                        </div>
                    </div>
                    <Button
                        disabled={loading}
                        className="ml-auto w-full"
                        variant={"default"}
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator className="mt-2" />

        </>
    )
}

export default ProductForm;