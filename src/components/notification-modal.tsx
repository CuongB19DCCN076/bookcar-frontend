"use client"

import Modal from "@/components/ui/modal";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useNotificationModal from "@/hooks/use-notification-modal";
import * as z from "zod"
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useCallback, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const noticeFormSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    context: z.string().min(1),
    store_name: z.string().min(1),
    createAt: z.string().min(1),
    updateAt: z.string().min(1),
    status: z.string().min(1),
});

type NoticeFormType = z.infer<typeof noticeFormSchema>;

const NotificationModal: React.FC = () => {
    const notificationModal = useNotificationModal();
    const notice = useNotificationModal((state) => state.data) || {};

    const [loading, setLoading] = useState(false);
    const form = useForm<NoticeFormType>({
        resolver: zodResolver(noticeFormSchema),
        defaultValues: notice as NoticeFormType,
    });

    const onSubmit: SubmitHandler<NoticeFormType> = useCallback(async (data) => {
        setLoading(true);
        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        notificationModal.onClose();
    }, [notificationModal]);

    const selectItems = useMemo(() => [
        { value: "Còn hiệu lực", label: "Còn hiệu lực" },
        { value: "Hết hiệu lực", label: "Hết hiệu lực" },
    ], []);

    if (!notice) {
        return null;
    }

    return (
        <Modal open={notificationModal.isOpen} onClose={notificationModal.onClose}>
            <div className="w-full">
                <div className="w-full text-center font-semibold text-lg">
                    {notice ? "Chỉnh sửa thông báo" : "Thêm mới thông báo"}
                </div>
                <Separator className="my-4" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full" method="POST">
                        {/* Các FormField và xử lý tương tự */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nội dung</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={loading}
                                                placeholder="Nhập nội dung..."
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
                            name="context"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nội dung</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={loading}
                                                placeholder="Nhập nội dung..."
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
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Danh mục</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Chọn 1 Loại"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem
                                                value={"Còn hiệu lực"}
                                            >
                                                Còn hiệu lực
                                            </SelectItem>
                                            <SelectItem
                                                value={"Hết hiệu lực"}
                                            >
                                                Hết hiệu lực
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex mx-20 gap-x-2">
                            <Button variant={"success"} type="submit" disabled={loading}>Đặt vé</Button>
                            <Button variant={"ghost"} type="button" onClick={notificationModal.onClose} disabled={loading}>Hủy</Button>
                        </div>
                    </form>
                </Form>
                <Separator className="mt-2" />
            </div>
        </Modal>
    );
};

export default NotificationModal;