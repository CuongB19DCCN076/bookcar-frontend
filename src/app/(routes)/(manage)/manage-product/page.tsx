"use client"
import React, { useEffect, useState } from 'react'
import ProductClient from './components/client'
import useUser from '@/hooks/use-user'
import getAllProductByIdStore from '@/actions/get-all-product-by-idstore'
import { ProductColumn } from './components/column'

interface IProduct {
    productID: string;
    license_plates: string;
    description: string;
    phone_number: string;
    phone_number2: string;
    start_address: string;
    end_address: string;
    start_time: string;
    end_time: string;
    price: string;
    name: string;
    remain_seat: string;
    policy: string;
    utilities: string;
    type: string;
    createAt: string;
    updateAt: string;
    status: string
}

const ManageProduct = () => {
    const { id_store } = useUser();
    const [data, setData] = useState<ProductColumn[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllProductByIdStore({ id: Number(id_store) })
                if (res?.status === 200) {
                    const dataRes = res?.data.map((item: IProduct) => ({
                        id: item.productID,
                        name: item.name,
                        startAddress: item.start_address,
                        endAddress: item.end_address,
                        startTime: item.start_time,
                        endTime: item.end_time,
                        emptySeat: item.remain_seat,
                        price: item.price,
                        creatAt: item.createAt.split("T")[0],
                        status: "Đang " + item.status
                    }))
                    setData(dataRes)
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, [id_store]);

    return (
        <div className='p-4'>
            <ProductClient data={data} />
        </div>
    )
}

export default ManageProduct