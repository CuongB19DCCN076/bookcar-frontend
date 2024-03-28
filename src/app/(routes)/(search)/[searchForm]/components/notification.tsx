
import ItemNotification from "@/components/ui/item-notification";
import newIcon from "@/images/icon_new.png";
import Image from "next/image";

const Notification = () => {
    const data = [
        {
            name: "Nhà xe Hương Huyền",
            title: "Thông báo nghỉ ngày 20/1",
            content: "Những ngày khác hoạt động bình thường",
            effectiveness: false,
            updateAt: "18:00 10/1/2024"
        },
        {
            name: "Nhà xe Khắc Nam",
            title: "Thông báo thay đổi lịch trình",
            content: "Từ ngày 25/1 sẽ điểm đầu mới",
            effectiveness: true,
            updateAt: "10:00 15/1/2024"
        },
        {
            name: "Nhà xe Duy Khởi",
            title: "Thông báo giảm giá vé",
            content: "Áp dụng từ ngày 22/1 đến hết tháng",
            effectiveness: true,
            updateAt: "14:30 18/1/2024"
        },
        {
            name: "Nhà xe Mỹ Đình",
            title: "Thông báo thay đổi số điện thoại",
            content: "Số điện thoại liên hệ mới: 0987654321",
            effectiveness: true,
            updateAt: "08:45 20/1/2024"
        },
        {
            name: "Nhà xe Anh Tú",
            title: "Thông báo tạm dừng hoạt động",
            content: "Tạm dừng từ ngày 23/1 đến khi có thông báo mới",
            effectiveness: false,
            updateAt: "09:15 21/1/2024"
        }
    ];
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
            {data.map((item, index) => (
                <ItemNotification name={item.name} key={index} effectiveness={item.effectiveness} title={item.title} content={item.content} updateAt={item.updateAt} />
            ))}
        </div>
    )
}

export default Notification