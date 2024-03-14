import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatVND = (price: number | bigint): string => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export const calculateTime = (startTime: string, endTime: string) => {
  const startParts = startTime.split(':');
  const endParts = endTime.split(':');

  const startMinutes = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
  const endMinutes = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);

  // Tính sự khác biệt
  let diffInMinutes = endMinutes - startMinutes;

  // Xử lý trường hợp thời điểm kết thúc trước thời điểm bắt đầu
  if (diffInMinutes < 0) {
    diffInMinutes += 24 * 60; // Thêm 1 ngày (24 giờ)
  }

  // Tính số giờ và phút
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  return `${hours} Giờ ${minutes} Phút`;
}

export function isPositiveInteger(str: string | number | undefined) {
  if (typeof str === "string") {
    return /^\d+$/.test(str) && parseInt(str, 10) > 0;
  }
  return false;
}

export function formatDate(str: string) {
  const day = str.split("T")[0].split("-")
  const time = str.split("T")[1].split("+")[0].split(":")
  return `Giờ: ${time[0]}:${time[1]}- Ngày: ${day[2]}/${day[1]}/${day[0]}`;
}
