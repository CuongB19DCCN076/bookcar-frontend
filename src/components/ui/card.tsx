"use client"
import { Menu, Tab, Transition } from "@headlessui/react"
import ItemNotification from "./item-notification"
import { BellRing, ChevronDownCircle, Copy, Disc, MapPin } from "lucide-react"
import { Fragment, ReactNode, useState } from "react"
import Image from "next/image"
import { Button } from "./button"
import { calculateTime, cn, formatVND } from "@/lib/utils"

import toast from "react-hot-toast"
import usePreviewModal from "@/hooks/use-preview-modal"
import { ProductManage } from "@/types"

interface IImage {
    id: number | string,
    url: string,
    title: string
}

interface IListInfo {
    name: string,
    data: IImage[] | string
}

const RenderHTML = ({ data }: { data: string }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: data }} />
    );
}

const Card: React.FC<{ product: ProductManage }> = ({ product }) => {

    const listInfo: IListInfo[] = [
        {
            name: "Hình ảnh",
            data: product?.images.map((item, index) => ({
                id: index,
                url: item?.image_url,
                title: "image"
            }))
        },
        {
            name: "Chính sách",
            data: product?.policy
        },
        {
            name: "Tiện ích",
            data: product?.utilities
        },
        {
            name: "Mô tả",
            data: product?.description
        }
    ]
    const modalpro = usePreviewModal();
    const handleCopy = (sdt: string) => {
        navigator.clipboard.writeText(sdt);
        toast.success("Sdt đã được sao chép vào clipboard.")
    }
    const randomNumber = Math.random();
    return (
        <div className='rounded-sm overflow-hidden my-5 hover:shadow-2xl'>
            <div className='p-4 bg-white w-full lg:flex relative'>
                <div className='pb-4 lg:pb-0 lg:absolute top-3 right-3 text-lg font-semibold text-[blue] text-end'>
                    <div className='text-black'>
                        Không cần thanh toán trước
                    </div>
                    Giá vé: {formatVND(Number(product?.price))}
                </div>
                <div className='w-full sm:w-40'>
                    <div className=' bg-blue-400 h-10 p-2 text-base font-medium text-white mb-2 rounded'>
                        <Menu>
                            <Menu.Button className={"flex justify-between w-full"}>
                                <div>Thông báo</div>
                                <BellRing className='ml-auto' />
                            </Menu.Button>
                            {/* Use the `Transition` component. */}
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="relative lg:w-80 arrow z-30 mt-4 -left-2 origin-top-right divide-y divide-gray-100 rounded-md bg-[#FAEBD7] shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    <div className="border-b" >
                                        <Menu.Item>
                                            {({ active }) => (
                                                <div
                                                    className={`text-black group flex w-full items-center flex-col rounded-md p-2 `}
                                                >
                                                    <div className='text-xl font-medium text-center w-full pb-4'>
                                                        Thông báo
                                                    </div>
                                                    <ItemNotification />
                                                </div>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                    <div className="relative h-44 w-full rounded-md overflow-hidden sm:h-40 sm:w-40 ">
                        <Image
                            fill
                            src={product?.images[0].image_url}
                            alt=""
                            className="object-cover object-center"
                        />
                    </div>
                </div>
                <div className='flex items-center flex-col lg:grid lg:grid-cols-2 lg:ml-3 lg:flex-1'>
                    <div className='grid grid-cols-8 lg:block'>
                        <div className='col-span-5'>
                            <div className='text-xl font-bold text-green-800'>
                                {product?.owner_name}
                            </div>
                            <div className='text-base my-2 font-bold text-black'>
                                Tuyến:{product?.name}
                            </div>
                            <div className='text-sm text-black my-4'>
                                {product?.type} - {product?.license_plates}
                            </div>
                        </div>

                        <div className='border-l lg:border-l-0 col-span-3 pl-3 lg:pl-0'>
                            <div className='flex items-center '>
                                <Disc color='blue' />
                                <div className='lg:flex items-center'>
                                    <span className='text-2xl font-bold ml-2'>{product?.start_time.split(":00")[0]}</span>
                                    <span>- {product.start_address}</span>
                                </div>
                            </div>
                            <div className='py-3 lg:py-6 my-2 px-8 ml-3 border-l-2 border-dashed'>
                                {calculateTime(product?.start_time.split(":00")[0], product?.end_time.split(":00")[0])}
                            </div>
                            <div className='flex items-center'>
                                <MapPin color='red' />
                                <div className='lg:flex items-center'>
                                    <span className='text-2xl font-bold ml-2'>{product?.end_time.split(":00")[0]}</span>
                                    <span>- {product.end_address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:border-l pl-2 flex flex-col justify-between lg:mt-24 text-end mt-4'>
                        <div className='font-semibold'>
                            Còn <span className='text-[red]'>{product.remain_seat}</span> chỗ trống
                        </div>
                        <div className='flex items-center gap-x-2 my-4 lg:block'>
                            Liên hệ:
                            <div className='flex items-center justify-end'>
                                {product?.phone_number}
                                <Copy color='blue' size={20} className='ml-2 cursor-pointer' onClick={() => handleCopy(product?.phone_number)} />
                            </div>
                            <div className='flex items-center justify-end mt-2'>
                                {product?.phone_number2}
                                <Copy color='blue' size={20} className='ml-2 cursor-pointer' onClick={() => handleCopy(product?.phone_number2)} />
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <label className='flex text-[green] hover:text-[blue]' htmlFor={`abcc + ${randomNumber}`}>
                                Thông tin chi tiết
                                <ChevronDownCircle />
                            </label>
                            <Button
                                variant={"success"}
                                type='button'
                                onClick={() =>
                                    modalpro.onOpen({
                                        garage: product?.owner_name ? product?.owner_name : "Nhà xe",
                                        name: `${product?.start_address} - ${product?.end_address}`,
                                        price: product?.price,
                                        id: product?.productID
                                    }, 1)}
                            >
                                Đặt xe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <input type='checkbox' className='peer hidden' id={`abcc + ${randomNumber}`} />
            <div className="w-fullpx-2 sm:px-0 hidden peer-checked:block">
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        {listInfo.map((item) => (
                            <Tab
                                key={item.name}
                                className={({ selected }) =>
                                    cn(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                        selected
                                            ? 'bg-white text-blue-700 shadow'
                                            : 'text-black hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                            >
                                {item.name}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        {listInfo.map((posts, idx) => {
                            if (posts.name === "Hình ảnh" && Array.isArray(posts.data)) {
                                return (
                                    <Tab.Panel
                                        key={idx}
                                        className={cn(
                                            'rounded-xl bg-white p-3',
                                            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                        )}
                                    >
                                        <ul className="grid grid-cols-4">
                                            {posts.data.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className="relative rounded-md p-3 hover:bg-gray-100"
                                                >
                                                    <img alt="" src={item?.url} className="object-contain" />
                                                </li>
                                            ))}
                                        </ul>
                                    </Tab.Panel>
                                )
                            }
                            if (typeof posts?.data === "string") {
                                return (
                                    <Tab.Panel
                                        key={idx}
                                        className={cn(
                                            'rounded-xl bg-white p-3',
                                            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                        )}
                                    >
                                        <RenderHTML data={posts.data} />
                                    </Tab.Panel>
                                )
                            }
                        }
                        )}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}

export default Card