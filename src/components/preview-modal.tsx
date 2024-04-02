import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/modal";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import usePreviewModal from "@/hooks/use-preview-modal";
import useUser from "@/hooks/use-user";
import toast from "react-hot-toast";
import { formatVND, isPositiveInteger } from "@/lib/utils";
import createOrder from "@/actions/create-order";
import updateOrder from "@/actions/update-order";

const PreviewModal = () => {
    const previewModal = usePreviewModal();
    const router = useRouter();
    const product = usePreviewModal((state) => state.data);
    const role = usePreviewModal((state) => state.role);
    const { email, role: roleUser } = useUser();
    const [startAddress, setStartAddress] = useState("");
    const [endAddress, setEndAddress] = useState("");
    const [message, setMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [time, setTime] = useState("");

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
        if (![startAddress, endAddress, message, phoneNumber, time].every(Boolean)) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }
        if (!isPositiveInteger(quantity) || Number(quantity) < 1) {
            toast.error("Vui lòng nhập số lượng lớn hơn 0");
            return;
        }
        const selectedTime = new Date(time);
        const currentDate = new Date();
        if (selectedTime < currentDate) {
            toast.error("Vui lòng chọn thời gian lớn hơn thời gian hiện tại");
            return;
        }
        const data = {
            destinationAddress: endAddress,
            pickUpAddress: startAddress,
            pickTime: time,
            message,
            quantity: Number(quantity),
            phoneNumber,
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
            toast.loading("Chỉ có thể hủy khi đang trong trạng thái chờ xác nhận")
            return;
        }
        try {
            const res = await updateOrder(product.id, { status })
            if (res?.status === 200) {
                toast.success("Cập nhật vé thành công!");
                previewModal.onClose();
            }
        } catch (e) {
            toast.error("Có lỗi xảy ra vui lòng thử lại")
            console.log(e)
        }
    }

    const getInputField = (label: string, value: string, type: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) => (
        <div className="flex justify-between gap-5 lg:gap-20 text-base font-semibold my-4">
            <div className="max-w-20 w-full">
                {label}:
            </div>
            <div className="flex-1">
                {role !== 1 ? value : (
                    <Input
                        placeholder={label}
                        type={type}
                        className="w-full"
                        value={value}
                        onChange={onChange}
                    />
                )}
            </div>
        </div>
    );

    return (
        <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
            <div className="w-full">
                <div className="w-full text-center font-semibold text-lg">
                    Đặt vé
                </div>
                <div className="px-5 lg:px-0">
                    {getInputField("Tên vé", product.name, "text", () => { })}
                    {getInputField("Nhà xe", product.garage, "text", () => { })}
                    {getInputField("Giá vé", formatVND(Number(product.price)), "text", () => { })}
                    {getInputField("Điểm đón", startAddress, "text", (e) => setStartAddress(e.target.value))}
                    {getInputField("Điểm đến", endAddress, "text", (e) => setEndAddress(e.target.value))}
                    {getInputField("Thời gian đón", time, "datetime-local", (e) => setTime(e.target.value))}
                    {getInputField("Lời nhắn", message, "text", (e) => setMessage(e.target.value))}
                    {getInputField("Số điện thoại", phoneNumber, "text", (e) => setPhoneNumber(e.target.value))}
                    {getInputField("Số lượng vé", String(quantity), "text", (e) => setQuantity(Number(e.target.value)))}
                    {role !== 1 && getInputField("Trạng thái", product?.status_order || "", "text", () => { })}
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
    );
}

export default PreviewModal;
