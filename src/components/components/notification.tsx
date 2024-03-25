
import ItemNotification from "@/components/ui/item-notification";
import newIcon from "@/images/icon_new.png";
import Image from "next/image";

const Notification = () => {
    return (
        <div
            className={`text-black group flex w-full items-center flex-col rounded-md p-2 `}
        >
            <div className='text-2xl font-medium text-center w-full flex items-center mx-auto pb-4'>
                Thông báo
                <div className="w-10 h-10">
                    <Image alt="new" src={newIcon} height={20} width={40} className="object-cover object-center" />
                </div>
            </div>
            <ItemNotification />
            <ItemNotification />
        </div>
    )
}

export default Notification