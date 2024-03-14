"use client"
import * as z from "zod";
import { Trash } from 'lucide-react';
import toast from "react-hot-toast";
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
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
    const onSubmit = async (data: ProductFormValues) => {
        try {
            const access_token = localStorage.getItem("access_token");
            setLoading(true);
            if (initialData) {
                await putProductById(params?.productId, { ...data, emailUser: email });
            } else {
                await createProduct(
                    { ...data, emailUser: email }
                    // , {
                    //     headers: {
                    //         Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    //     }
                    // }
                );
            }
            route.refresh();
            // route.push(`/${params.storeId}/colors`)
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong.");
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await deleteProductById(params?.productId);
            route.refresh();
            route.push("/")
            toast.success("Xóa thành công sản phẩm");
        } catch (error) {
            toast.error("Trước tiên hãy đảm bảo bạn đã xóa tất cả sản phẩm và danh mục");
            console.log(error)
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }
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
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên vé</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Tên vé..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="start_address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Địa điểm bắt đầu</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={loading}
                                                placeholder="Địa điểm bắt đầu..."
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="end_address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Địa điểm kết thúc</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={loading}
                                                placeholder="Địa điểm kết thúc..."
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="start_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thời gian bắt đầu</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={loading}
                                                type="time"
                                                placeholder="Thời gian bắt đầu..."
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="end_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thời gian kết thúc</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={loading}
                                                type="time"
                                                placeholder="Thời gian kết thúc..."
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="remain_seat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số ghế trống</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={loading}
                                                placeholder="Nhập số trống..."
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="license_plates"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Biển số xe</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={loading}
                                                placeholder="Nhập biển số xe..."
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kiểu xe</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={loading}
                                                placeholder="Nhập kiểu xe..."
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Giá vé</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                type="number"
                                                disabled={loading}
                                                placeholder="Nhập giá vé..."
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="col-span-3 grid grid-cols-3 gap-8">
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Số điện thoại 1</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-x-4">
                                                <Input
                                                    disabled={loading}
                                                    placeholder="Nhập số điện thoại 1"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone_number2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Số điện thoại 2</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-x-4">
                                                <Input
                                                    disabled={loading}
                                                    placeholder="Nhập số điện thoại 2"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-3 grid grid-cols-3 gap-x-4">
                            <FormField
                                control={form.control}
                                name="policy"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Chính sách</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-x-4 w-full">
                                                <Tiptap description={!initialData ? text : field.value} onChange={field.onChange} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="utilities"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tiện ích chuyến xe</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-x-4 w-full">
                                                <Tiptap description={field.value} onChange={field.onChange} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mô tả</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-x-4 w-full">
                                                <Tiptap description={field.value} onChange={field.onChange} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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