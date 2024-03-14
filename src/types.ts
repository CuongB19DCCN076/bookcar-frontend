
export interface Product {
    garage: string;
    price: string;
    name: string;
    start_address?: string;
    end_address?: string;
    start_time?: string;
    message?:string;
    phone?:string;
    quantity?: number;
    id?: string;
    status_order?: string
}

export interface Image{
    image_url: string
}
export interface Stop{
    stop_time: string,
    stop_date: string,
    createAt: string,
    updateAt: string
}

export interface ProductManage {
    productID: string,
    name: string,
    start_address: string,
    end_address: string,
    start_time: string,
    end_time: string,
    license_plates: string,
    phone_number: string,
    phone_number2: string,
    description: string,
    policy: string,
    images: Image[],
    price: string,
    remain_seat: string,
    type: string,
    utilities: string,
    stops: Stop[],
    owner_name?:string
}

export interface Notice {
    id: string;
    title: string;
    context: string;
    store_name: string;
    createAt: string;
    updateAt: string;
}

export interface SignIn {
    email: string;
    password: string;
}

export interface SignUp {
    email: string;
    password: string;
    role: string,
    phone_number: string,
    username: string
}