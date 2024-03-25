import { useState } from "react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import {
    Edit,
    EyeOff,
    MoreHorizontal,
    Trash
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ProductColumn } from "./column";
import AlertModal from "@/components/models/alert-model";
import deleteProductById from "@/actions/delete-product";

interface CellActionProps {
    data: ProductColumn
}


const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const route = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false)
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Id sản phẩm được sao chép vào bảng nhớ tạm.")
    }
    const onDelete = async () => {
        try {
            setLoading(true);
            await deleteProductById(data?.id);
            route.refresh();
            location.reload();
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {/* <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Chi tiết
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => route.push(`/manage-product/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Xóa
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <EyeOff className="mr-2 h-4 w-4" />
                        Ẩn
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onClick={() => setOpen(true)}>
                        <MapPin className="mr-2 h-4 w-4" />
                        Chia sẻ vị trí
                    </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellAction