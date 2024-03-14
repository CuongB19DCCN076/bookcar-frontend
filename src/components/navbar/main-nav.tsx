"use client"
import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface MenuItem {
    name: string;
    href: string;
    active: boolean;
    childrens?: MenuItem[];
}

const MainNav = () => {
    const pathname = usePathname();
    const { email, removeUser, role } = useUser();
    let submenu: MenuItem = {
        name: "Đăng nhập",
        href: "/sign-in",
        active: pathname.includes("/sign-in")
    }
    if (email !== "") {
        if (role == "Seller") {
            submenu = {
                name: "Tôi",
                href: "/me",
                active: pathname.includes("/me"),
                childrens: [
                    {
                        name: "Thông tin bản thân",
                        href: "/info",
                        active: pathname.includes("/info")
                    },
                    {
                        name: "Quản lý đơn hàng",
                        href: "/manage-product",
                        active: pathname.includes("/manage-product")
                    },
                ]
            }
        } else {

            submenu = {
                name: "Tôi",
                href: "/me",
                active: pathname.includes("/me"),
                childrens: [
                    {
                        name: "Danh sách vé đã đặt",
                        href: "/order",
                        active: pathname.includes("/order"),
                    }
                ]
            }
        }
    }

    const menus: MenuItem[] = [
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
        submenu
    ];

    const handleLogOut = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        removeUser()
        toast.success("Đăng xuất thành công!")
    }

    return (
        <div className="text-lg items-center h-full hidden lg:flex  font-medium text-white">
            {menus.map((item) => {
                if (item?.childrens) {
                    return (
                        <div key={item.href} className="relative ">
                            <Menu >
                                <Menu.Button
                                    className={cn(
                                        "flex relative justify-between p-4 text-lg font-medium w-full text-start items-center", "hover:text-white hover:bg-violet-500",
                                        item.active && "border-y-4 border-[red]",
                                        item.active && "after:absolute after:right-0 after:w-1 after:h-2 after:bottom-0 after:bg-[red]",
                                        item.active && "before:absolute before:left-0 before:top-0 before:h-2 before:w-1 before:bg-[red]"
                                    )}>
                                    {item.name}
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
                                    <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                        {item.childrens.map((item) => (
                                            <div className="border-b" key={item.href}>
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
                                        {(item.name === "Tôi" || item.name === "Danh sách vé đã đặt") && <div className="border-b" key={item.href}>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <div
                                                        onClick={() => handleLogOut()}
                                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md p-4 text-base cursor-pointer`}
                                                    >
                                                        Đăng xuất
                                                    </div>
                                                )}
                                            </Menu.Item>
                                        </div>}
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>

                    )
                }
                return (
                    <Link
                        href={item.href}
                        className={cn(
                            "block p-4 text-lg font-medium relative", "hover:text-white hover:bg-violet-500",
                            item.active && "border-y-4 border-[red]",
                            item.active && "after:absolute after:right-0 after:w-1 after:h-2 after:bottom-0 after:bg-[red]",
                            item.active && "before:absolute before:left-0 before:top-0 before:h-2 before:w-1 before:bg-[red]"
                        )}
                        key={item.name}>
                        {item.name}
                    </Link>
                )
            })}
        </div>
    )
}

export default MainNav