
"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type NotificationColumn = {
    id: string
    name: string,
    startTime: string,
    licensePlate: string,
    title: string,
    content: string,
    creatAt: string,
    updateAt: string,
    status: string
}

export const columns: ColumnDef<NotificationColumn>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Tên",
    },
    {
        accessorKey: "startTime",
        header: "Giờ đi",
    },
    {
        accessorKey: "licensePlate",
        header: "Biển số xe",
    },
    {
        accessorKey: "title",
        header: "Tiêu đề",
    },
    {
        accessorKey: "content",
        header: "Nội dung",
    },
    {
        accessorKey: "creatAt",
        header: "Ngày tạo",
    },
    {
        accessorKey: "updateAt",
        header: "Ngày sửa",
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
