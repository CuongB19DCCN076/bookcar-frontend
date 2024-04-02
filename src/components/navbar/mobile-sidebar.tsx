"use client"
import React, { Fragment } from 'react'
import { useSidebarStore } from "@/hooks/sidebar-store";
import { ChevronDownIcon, X } from "lucide-react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import IconButton from "../ui/icon-button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from 'next/link';

const MobileSidebar = () => {
    const pathname = usePathname();
    const menus = [
        {
            name: "Trang chủ",
            href: "/",
            active: pathname.includes("")
        },
        {
            name: "Tôi",
            href: "/me",
            active: pathname.includes("/me")
        },
        {
            name: "Gửi hàng",
            href: "/shipping",
            active: pathname.includes("/shipping")
        },
        {
            name: "Đặt xe",
            href: "/carrental",
            active: pathname.includes("/carrental"),
            childrens: [
                {
                    name: "Xe dịch vụ",
                    href: "/carrental/1",
                    active: pathname.includes("/carrental/1")
                },
                {
                    name: "Hợp đồng du lịch",
                    href: "/carrental/2",
                    active: pathname.includes("/carrental/2")
                },
            ]
        },
        {
            name: "Giới thiệu",
            href: "/introduce",
            active: pathname.includes("/introduce")
        },
        {
            name: "Tin tức",
            href: "/notification",
            active: pathname.includes("/notification")
        },
    ]
    const menu = ["Tôi", "Gửi hàng", "Thuê xe", "Giới thiệu", "Tin tức"]
    const { isOpen, handleClose } = useSidebarStore();
    return (
        <Dialog open={isOpen} as="div" className={"relative z-40 sm:hidden"} onClose={handleClose}>
            {/* Background */}
            <div className="fixed inset-0 bg-black bg-opacity-25">
                {/* Dialog positon */}
                <div className="fixed inset-0 z-40 flex">
                    <Dialog.Panel className={"relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"}>

                        {/* Close Button */}
                        <div className="flex items-center justify-end px-4">
                            <IconButton icon={<X size={15} />} onClick={handleClose} />
                        </div>

                        {/* Render the filters */}
                        <div className="p-4 transition">
                            {menus.map((menu) => {
                                if (menu.childrens) {
                                    return (
                                        <Menu key={menu.href}>
                                            <Menu.Button
                                                className={cn(
                                                    "flex justify-between border-b p-4 text-lg font-medium w-full text-start", "hover:text-white hover:bg-violet-500",
                                                    menu.active && "text-[red]"
                                                )}>
                                                {menu.name}
                                                <ChevronDownIcon
                                                    className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                    aria-hidden="true"
                                                />
                                            </Menu.Button>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items >
                                                    {menu.childrens.map((item) => (
                                                        <div className="border-b ps-4" key={item.href}>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link
                                                                        href={item.href}
                                                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                            } group flex w-full items-center rounded-md p-4 text-base`}
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    ))}

                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    )
                                }
                                return (
                                    <Link
                                        href={menu.href}
                                        className={cn(
                                            "border-b block p-4 text-lg font-medium", "hover:text-white hover:bg-violet-500",
                                            menu.active && "text-[red]"
                                        )}
                                        key={menu.name}>
                                        {menu.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    )
}

export default MobileSidebar