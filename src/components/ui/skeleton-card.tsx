import { BellRing, ChevronDownCircle, Copy, Disc, MapPin } from 'lucide-react'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Button } from './button'

const SkeletonCard = () => {
    return (
        <div className='rounded-sm overflow-hidden my-5 hover:shadow-2xl'>
            <div className='p-4 bg-white w-full lg:flex relative'>
                <div className='pb-4 lg:pb-0 lg:absolute top-3 right-3 text-lg font-semibold text-[blue] text-end'>
                    <div className='text-black'>
                        <Skeleton height={20} width={150} />
                    </div>
                    Giá vé: <Skeleton height={20} width={100} />
                </div>
                <div className='w-full sm:w-40'>
                    <div className=' bg-blue-400 h-10 p-2 text-base font-medium text-white mb-2 rounded'>
                        <div className='flex justify-between'>
                            <Skeleton height={20} width={80} />
                            <BellRing className='ml-auto' />
                        </div>
                    </div>
                    <div className="relative h-44 w-full rounded-md overflow-hidden sm:h-40 sm:w-40 ">
                        <Skeleton height={176} width={176} />
                    </div>
                </div>
                <div className='flex items-center flex-col lg:grid lg:grid-cols-2 lg:ml-3 lg:flex-1'>
                    <div className='grid grid-cols-8 lg:block'>
                        <div className='col-span-5'>
                            <div className='text-xl font-bold text-green-800'>
                                Nhà xe <Skeleton height={20} width={150} />
                            </div>
                            <div className='text-base my-2 font-bold text-black'>
                                Tuyến: <Skeleton height={20} width={150} />
                            </div>
                            <div className='text-sm text-black my-4'>
                                <Skeleton height={20} width={200} />
                            </div>
                        </div>
                        <div className='border-l lg:border-l-0 col-span-3 pl-3 lg:pl-0'>
                            <div className='border-l lg:border-l-0 col-span-3 pl-3 lg:pl-0'>
                                <div className='flex items-center '>
                                    <Disc color='blue' />
                                    <div className='lg:flex items-center'>
                                        <Skeleton height={30} width={200} className='ml-3' />
                                    </div>
                                </div>
                                <div className='py-3 lg:py-6 my-2 px-8 ml-3 border-l-2 border-dashed'>
                                    <Skeleton />
                                </div>
                                <div className='flex items-center'>
                                    <MapPin color='red' />
                                    <div className='lg:flex items-center'>
                                        <Skeleton height={30} width={200} className='ml-3' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:border-l pl-2 flex flex-col justify-between lg:mt-24 text-end mt-4'>
                        <Skeleton width={150} height={23} />
                        <div className='flex items-center gap-x-2 my-4 lg:block'>
                            Liên hệ:
                            <div className='flex items-center justify-end'>
                                <Skeleton height={20} width={120} />
                                <Copy color='blue' size={20} className='ml-2 cursor-pointer' />
                            </div>
                            <div className='flex items-center justify-end mt-2'>
                                <Skeleton height={20} width={120} />
                                <Copy color='blue' size={20} className='ml-2 cursor-pointer' />
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <label className='flex text-[green] hover:text-[blue]'>
                                Thông tin chi tiết
                                <ChevronDownCircle />
                            </label>
                            <Button
                                variant={"success"}
                                type='button'
                            >
                                Đặt xe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonCard