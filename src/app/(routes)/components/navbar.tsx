"use client"
import getOwnerName from "@/actions/get-owner-name";
import { useEffect, useState } from "react";



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
        </div>
    )
}

export default Navbar