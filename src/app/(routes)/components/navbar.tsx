"use client"
import getOwnerName from "@/actions/get-owner-name";
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'


const Navbar: React.FC = () => {
    const [data, setData] = useState<string[]>([]);
    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await getOwnerName();
                if (res?.status === 200) {
                    setData(res?.data?.map((item: any) => {
                        return item?.storeName;
                    }))
                }
            }
            fetchData();
        } catch (e) {
            console.log(e);
        }
    }, [])
    return (
        <div className="p-4">
            <div className="font-medium text-2xl border-b pb-4">
                Nhà xe hợp tác
            </div>
            {data?.map((item) => {
                return (
                    <div key={item} className="font-medium text-[green] p-3 border-b">
                        {item}
                    </div>
                )
            })}
            {data.length === 0 && Array(10).fill(0).map((_, index) => (
                <div className="font-medium text-[green] p-3 border-b mb-1" key={index}>
                    <Skeleton height={20} />
                </div>
            ))}
        </div>
    )
}

export default Navbar