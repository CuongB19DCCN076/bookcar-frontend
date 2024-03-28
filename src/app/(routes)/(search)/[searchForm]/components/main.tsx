"use client"

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import Filter from './filter'
import Card from '@/components/ui/card'
import { useEffect, useState } from 'react'
import useUser from '@/hooks/use-user'
import { ProductManage } from '@/types'
import { useSearchParams } from 'next/navigation'
import searchProducts from '@/actions/search-product'
import SkeletonCard from '@/components/ui/skeleton-card'
const Main = () => {
    const { email, addUser } = useUser();
    const [products, setProducts] = useState<ProductManage[]>();
    const searchParams = useSearchParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await searchProducts({ key: searchParams.get("key"), end_address: searchParams.get("end_address"), start_address: searchParams.get("start_address"), start_time: searchParams.get("start_time"), });
                setProducts(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [addUser, email, searchParams])
    return (
        <>
            <Filter />
            <div className='text-3xl font-semibold'>
                Tất cả vé
            </div>
            <div className='my-3'>
                {!products && Array(3).fill(0).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
                {
                    products && products.map((item) => (
                        <Card key={item?.productID} product={item} />
                    ))
                }
                <Pagination className='my-5'>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    )
}

export default Main