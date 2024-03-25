"use client"
import React from 'react'
import { RefreshCcw } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import Heading from '@/components/ui/heading'
import { DataTable } from '@/components/ui/data-table'
import { OrderColumn, columns } from './column'

interface OrderClientProps {
    data: OrderColumn[],
    fun: () => void;
}

const OrderClient: React.FC<OrderClientProps> = ({
    data, fun
}) => {
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Danh sách vé đã đặt (${data.length})`}
                    description='Xem và chỉnh sửa vé đã đặt của bạn'
                />
                <div className='p-2 border rounded-sm hover:bg-slate-200 cursor-pointer active:bg-slate-300' onClick={() => fun()}>
                    <RefreshCcw />
                </div>
            </div>
            <Separator />
            <DataTable keySearch={"name"} columns={columns} data={data} />
        </>
    )
}

export default OrderClient