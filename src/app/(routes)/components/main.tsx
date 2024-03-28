"use client"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import Filter from './filter'
import { Suspense, useEffect, useState } from 'react'
import useUser from '@/hooks/use-user'
import getAllProduct from '@/actions/get-all-product'
import { ProductManage } from '@/types'
import { useSearchParams } from 'next/navigation'
import Card from '@/components/ui/card'
import SkeletonCard from '@/components/ui/skeleton-card'
interface IPagination {
    pagiNumber: number,
    page: number
}

const Main = () => {
    const { email, addUser } = useUser();
    const [products, setProducts] = useState<ProductManage[]>();
    const searchParams = useSearchParams();
    const page = searchParams.get("page") ? searchParams.get("page") : "1";
    const [pagination, setPagination] = useState<IPagination>({
        pagiNumber: 1,
        page: 1
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllProduct(page);
                setProducts(data?.data?.data);
                console.log(typeof data?.data?.pageNumber);
                console.log(typeof data?.data?.page);
                setPagination({
                    pagiNumber: Number(data?.data?.pageNumber),
                    page: Number(data?.data?.page),
                })
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [addUser, email, page])
    return (
        <>
            <Filter />
            <div className='text-3xl font-semibold'>
                Tất cả vé
            </div>
            <div className='my-3'>
                {!products && Array(10).fill(0).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
                {
                    products && products?.map((item) => (
                        <Card key={item?.productID} product={item} />
                    ))
                }
                <Pagination className='my-5'>
                    <PaginationContent>
                        {Number(page) !== 1 && <PaginationItem>
                            <PaginationPrevious href={`/?page=${pagination.page - 1}`} />
                        </PaginationItem>}
                        {
                            Array(pagination.pagiNumber ? pagination.pagiNumber : 0).fill(0).map((_, index) => {
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationLink href={`/?page=${index + 1}`} isActive={pagination.page === index + 1}>{index + 1}</PaginationLink>
                                    </PaginationItem>
                                )
                            })
                        }
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        {Number(page) < pagination.pagiNumber && <PaginationItem>
                            <PaginationNext href={`/?page=${pagination.page + 1}`} />
                        </PaginationItem>}
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    )
}

const MainPage = () => {
    return (
        <Suspense>
            <Main />
        </Suspense>
    )
}

export default MainPage;