"use client"
import React from 'react'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Heading from '@/components/ui/heading'
import { DataTable } from '@/components/ui/data-table'
import { NotificationColumn, columns } from './column'
import useNotificationModal from '@/hooks/use-notification-modal'

interface NotificationClientProps {
    data: NotificationColumn[]
}

const NotificationClient: React.FC<NotificationClientProps> = ({
    data
}) => {
    const params = useParams();
    const notificationModal = useNotificationModal();
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Đơn hàng (${data.length})`}
                    description='Quản lý đơn hàng'
                />
                <div >
                    <Button onClick={() => notificationModal.onOpen({
                        id: '',
                        title: '',
                        context: '',
                        store_name: '',
                        createAt: '',
                        updateAt: ''
                    })}>
                        <Plus className='mr-2 h-4 w-4' />
                        Thêm mới
                    </Button>
                </div>
            </div>
            <Separator />
            <DataTable keySearch={"name"} columns={columns} data={data} />

        </>
    )
}

export default NotificationClient