"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Clock, Disc, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React, { useState } from 'react'

const Filter = () => {
    const [search, setSearch] = useState<string>();
    const [searchFull, setSearchFull] = useState({
        start_address: "",
        end_address: "",
        start_time: "",
    });
    const router = useRouter();
    const handleSubmit1 = () => {
        const query = {
            key: search
        }
        const url = queryString.stringifyUrl({
            url: `${process.env.NEXT_PUBLIC_API_URL2}search/`,
            query
        }, { skipNull: true })
        router.push(url);
    }

    const handleSubmit2 = () => {
        const query = {
            start_address: searchFull.start_address,
            end_address: searchFull.end_address,
            start_time: searchFull.start_time
        }
        const url = queryString.stringifyUrl({
            url: `${process.env.NEXT_PUBLIC_API_URL2}search/`,

            query
        }, { skipNull: true })
        router.push(url);
    }

    return (
        <div>
            <div className="flex w-full items-center space-x-2">
                <Input type="email" placeholder="Nhập thông tin cần tìm kiếm" value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button type="submit" variant={"destructive"} onClick={() => handleSubmit1()}>Tìm Kiếm</Button>
            </div>
            <div className="lg:flex w-full lg:justify-between lg:space-x-2 py-4 px-2 mt-4 mb-5 rounded-sm bg-white">
                <div className='grid grid-cols-2 lg:grid lg:grid-cols-4 gap-x-1'>
                    <div>
                        <div className='flex items-end'>
                            <div className='pb-3 mr-1'>
                                <Disc size={20} color='#424bcd' />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="diemdon">Điểm đón</Label>
                                <Input type="text" id="diemdon" className='outline-none ring-transparent' value={searchFull.start_address} onChange={(e) => setSearchFull((prev) => ({ ...prev, start_address: e.target.value }))} placeholder="Nhập Điểm Đón" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-end'>
                            <div className='pb-3 mr-1'>
                                <MapPin size={20} color='red' />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="diemden">Điểm đến</Label>
                                <Input type="text" id="diemden" className='outline-none ring-transparent' placeholder="Nhập Điểm Đến" value={searchFull.end_address} onChange={(e) => setSearchFull((prev) => ({ ...prev, end_address: e.target.value }))} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-end mt-2 lg:mt-0'>
                            <div className='pb-3 mr-1 '>
                                <Clock size={20} color='#424bcd' />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="time">Giờ đi</Label>
                                <Input type="time" id="time" className='outline-none ring-transparent' value={searchFull.start_time} onChange={(e) => setSearchFull((prev) => ({ ...prev, start_time: e.target.value }))} />
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className='mt-7 ml-5 lg:mt-5' variant={"destructive"} onClick={() => handleSubmit2()}>Tìm Kiếm</Button>
                </div>
            </div>
        </div>
    )
}

export default Filter
