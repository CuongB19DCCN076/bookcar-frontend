"use client"

import usePreviewModal from "@/hooks/use-preview-modal"
import Modal from "@/components/ui/modal";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import useUser from "@/hooks/use-user";
import toast from "react-hot-toast";
import { formatVND, isPositiveInteger } from "@/lib/utils";
import createOrder from "@/actions/create-order";
import updateOrder from "@/actions/update-order";
import { useRouter } from "next/navigation";


const PreviewModal = () => {
    const previewModal = usePreviewModal();
    const router = useRouter();
    const product = usePreviewModal((state) => state.data);
    const role = usePreviewModal((state) => state.role);
    const { email, role: roleUser } = useUser();
    const [start_address, setStart_address] = useState<string>();
    const [end_address, setEnd_address] = useState<string>();
    const [message, setMessage] = useState<string>();
    const [phone_number, setPhone_number] = useState<string>();
    const [quantity, setQuantity] = useState<string | number | undefined>(0);
    const [time, setTime] = useState<string | undefined>();
    if (!product) {
        return null;
    }

    const handleSubmit = async () => {
        if (roleUser !== "Seller" && roleUser !== "User") {
            router.push("../../sign-in")
            toast.success("Vui lòng đăng nhập để được đặt vé!")
            previewModal.onClose();
            return;
        }
        if (roleUser === "Seller") {
            toast.success("Nhà xe không được đặt vé xe");
            previewModal.onClose();
            return;
        }
        if (!start_address || !end_address || !message || !phone_number || !quantity || !time) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }
        if (!isPositiveInteger(quantity)) {
            toast.error("Vui lòng nhập số lượng lớn hơn 0");
            return
        }
        if (Number(quantity) < 1) {
            toast.error("Vui lòng nhập số lượng lớn hơn 0");
            return
        }
        const data = {
            destinationAddress: end_address,
            pickUpAddress: start_address,
            pickTime: time,
            message: message,
            quantity: Number(quantity),
            phoneNumber: phone_number,
            price: Number(product?.price),
            totalPrice: Number(product?.price) * Number(quantity),
            orderStatus: "Chờ xác nhận",
            id: Number(product.id),
            emailUser: email,
        }
        try {
            const res = await createOrder(data);
            if (res?.status === 200) {
                toast.success("Đặt vé thành công")
                previewModal.onClose();
            }
        } catch (e) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại")
        }
    }
    const handleUpdateOrder = async (status: string) => {
        if (role === 1 && product?.status_order !== "Chờ xác nhận") {
            toast.loading("Chỉ có thể hủy khi đang trong trạng tháy ")
            return;
        }
        try {
            const res = await updateOrder(product.id, { status: status })
            if (res?.status === 200) {
                toast.success("Cập nhật vé thành công!");
                previewModal.onClose();
            }
        } catch (e) {
            toast.error("Có lỗi xảy ra vui lòng thử lại")
            console.log(e)
        }
    }

    return (
        <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
            <div className="w-full">
                <div className="w-full text-center font-semibold text-lg">
                    Đặt vé
                </div>
                <div className="px-5 lg:px-0">
                    <div className="flex justify-between gap-5 lg:gap-20 text-base font-semibold">
                        <div className="max-w-20 w-full">
                            Tên vé:
                        </div>
                        <div className="flex-1">
                            {product.name}
                        </div>
                    </div>
                    <div className="flex justify-between gap-5 lg:gap-20 text-base font-semibold my-4">
                        <div className="max-w-20 w-full">
                            Nhà xe:
                        </div>
                        <div className="flex-1">
                            {product.garage}
                        </div>
                    </div>
                    <div className="flex justify-between gap-5 lg:gap-20 text-base font-semibold my-4">
                        <div className="max-w-20 w-full">
                            Giá vé:
                        </div>
                        <div className="flex-1">
                            {formatVND(Number(product.price))}
                        </div>
                    </div>
                    <div className="flex justify-between gap-5 lg:gap-20 text-base font-semibold my-4">
                        <div className="max-w-20 w-full">
                            Điểm đón:
                        </div>
                        <div className="flex-1">
                            {role !== 1 ? product?.start_address : <Input placeholder="Điểm đón" type="text" className="w-full " value={start_address} onChange={(e) => setStart_address(e.target.value)} />}
                        </div>
                    </div>
                    <div className="flex justify-between gap-5 lg:gap-20 text-base font-semibold my-4">
                        <div className="max-w-20 w-full">
                            Điểm đến:
                        </div>
                        <div className="flex-1">
                            {role !== 1 ? product?.end_address : <Input placeholder="Điểm đến" type="text" className="w-full " value={end_address} onChange={(e) => setEnd_address(e.target.value)} />}
                        </div>
                    </div>
                    <div className="flex justify-between gap-5 lg:gap-20 text-base font-semibold my-4">
                        <div className="max-w-20 w-full">
                            Thời gian đón:
                        </div>
                        <div className="flex-1">
                            {role !== 1 ? product?.start_time : <Input placeholder="" type="datetime-local" className="w-full " value={time} onChange={(e) => setTime(e.target.value)} />}
                        </div>
                    </div>
                    <div className="flex justify-between gap-5 lg:gap-20 text-base font-semibold my-4">
                        <div className="max-w-20 w-full">
                            Lời nhắn:
                        </div>
                        <div className="flex-1">
                            {role !== 1 ? product?.message : <textarea placeholder="Nhập lời nhắn" className="w-full border p-2" value={message} onChange={(e) => setMessage(e.target.value)} />}
                        </div>
                    </div>
                    <div className="flex justify-between gap-5 lg:gap-20 text-base font-semibold my-4">
                        <div className="max-w-20 w-full">
                            Số điện thoại:
                        </div>
                        <div className="flex-1">
                            {role !== 1 ? product?.phone : <Input placeholder="Số điện thoại" type="text" className="w-full " value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />}
                        </div>
                    </div>
                    <div className="flex justify-between gap-5 lg:gap-20 text-base font-semibold my-4">
                        <div className="max-w-20 w-full">
                            Số lượng vé:
                        </div>
                        <div className="flex-1">
                            {role !== 1 ? product?.quantity : <Input placeholder="Số lượng vé" type="number" className="w-full" value={quantity} onChange={(e) => setQuantity(e.target.value)} />}
                        </div>
                    </div>
                    {role !== 1 && <div className="flex justify-between gap-5 lg:gap-20 text-base font-semibold my-4">
                        <div className="max-w-20 w-full">
                            Trạng thái:
                        </div>
                        <div className="flex-1">
                            {product?.status_order}
                        </div>
                    </div>}
                </div>
                <div className="flex mx-20 gap-x-2">
                    {role === 2 && product?.status_order !== "Đã hủy" && product?.status_order === "Chờ xác nhận" ? (
                        <Button variant="success" onClick={() => handleUpdateOrder("Đã xác nhận")}>Xác nhận</Button>
                    ) : (
                        product?.status_order === "Đã xác nhận" && <Button variant="success" onClick={() => handleUpdateOrder("Hoàn thành")}>Hoàn thành</Button>
                    )}
                    {(role === 2 && product?.status_order !== "Đã hủy" && product?.status_order !== "Hoàn thành") && <Button variant={"destructive"} onClick={() => handleUpdateOrder("Đã hủy")}>Hủy vé</Button>}
                    {role === 3 && product?.status_order === "Chờ xác nhận" ? <Button variant={"destructive"} onClick={() => handleUpdateOrder("Đã hủy")}>Hủy vé</Button> : (product?.status_order !== "Đã hủy" && role === 1 && <Button variant={"success"} onClick={() => handleSubmit()}>Đặt vé</Button>)}
                    <Button variant={"ghost"} onClick={() => previewModal.onClose()}>Thoát</Button>
                </div>
            </div>
        </Modal>
    )
}

export default PreviewModal