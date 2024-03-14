
"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
    orderID: string,
    name: string,
    pickUpAddress: string,
    destinationAddress: string,
    pickTime: string,
    message: string,
    phoneNumber: string,
    quantity: string,
    totalPrice: string,
    createdAt: string,
    orderStatus: string,
    owner_name: string
}

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "name",
        header: "Tên",
    },
    {
        accessorKey: "pickUpAddress",
        header: "Điểm đón",
    },
    {
        accessorKey: "destinationAddress",
        header: "Điểm trả",
    },
    {
        accessorKey: "pickTime",
        header: "Giờ đón",
    },
    {
        accessorKey: "phoneNumber",
        header: "Số điện thoại",
    },
    {
        accessorKey: "quantity",
        header: "Số vé",
    },
    {
        accessorKey: "message",
        header: "Lời nhắn",
    },
    {
        accessorKey: "totalPrice",
        header: "Tổng tiền",
    },
    {
        accessorKey: "createdAt",
        header: "Ngày tạo vé",
    },
    {
        accessorKey: "orderStatus",
        header: "Trạng thái",
        cell: ({ row }) => <div className={`${row.original.orderStatus === "Đã hủy" ? "bg-red-600" : row.original.orderStatus === "Chờ xác nhận" ? "bg-yellow-600" : row.original.orderStatus === "Đã xác nhận" ? "bg-blue-600" : "bg-green-600"}  text-center text-white p-2`}>{row.original.orderStatus}</div>
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
