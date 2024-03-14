"use client"
import React, { useEffect, useState } from 'react'
import OrderClient from './components/client'
import useUser from '@/hooks/use-user'
import { OrderColumn } from './components/column'
import { formatDate } from '@/lib/utils'
import Container from '@/components/ui/container'
import getAllOrderByEmailUser from '@/actions/get-all-order-by-email-store'

const OrderPage = () => {
    const { email } = useUser();
    const [data, setData] = useState<OrderColumn[]>();
    const [reload, setReload] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllOrderByEmailUser(email);
                const formatData = res?.map((item: any) => ({
                    orderID: item?.orderID,
                    pickUpAddress: item?.pickUpAddress,
                    name: item?.product?.name,
                    destinationAddress: item?.destinationAddress,
                    pickTime: formatDate(item?.pickTime),
                    message: item?.message,
                    phoneNumber: item?.phoneNumber,
                    quantity: item?.quantity,
                    totalPrice: item?.totalPrice,
                    createdAt: formatDate(item?.createdAt),
                    orderStatus: item?.orderStatus,
                    owner_name: item?.product?.owner_name,
                }))
                setData(formatData);
            } catch (e) {

            }
        }
        fetchData();
    }, [email, reload])
    const reloadPage = () => {
        setReload(!reload);
    }
    if (data) {
        return (
            <Container>
                <div className='p-4'>
                    <OrderClient data={data} fun={reloadPage} />
                </div>
            </Container>
        )
    }
    return (
        <Container>
            <div className='p-4'>
                <OrderClient data={[]} fun={reloadPage} />
            </div>
        </Container>
    )
}

export default OrderPage