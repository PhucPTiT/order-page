"use client"
import { Button } from "@/components/ui/button";
import { Item } from "../page";
import Product from "./item";
import { useEffect, useRef, useState } from "react";
import { Package } from "lucide-react";
import axios from "axios";

interface OrderProps {
    items: Item[];
}

const Order = ({items} : OrderProps) => {
        const scrollToRef = useRef(null);

        const [sumPrice, setSumPrice] = useState<number>(0);
        const [shippingAddress, setShippingAddress] = useState<string>("");
        const [nameReceiver, setNameReceiver] = useState<string>("");
        const [phoneReceiver, setPhoneReceiver] = useState<string>("");
        const [itemQuantities, setItemQuantities] = useState<{ [itemId: number]: number }>({});

        // State error
        const [shippingAddressError, setShippingAddressError] = useState<string>("");
        const [nameReceiverError, setNameReceiverError] = useState<string>("");
        const [phoneReceiverError, setPhoneReceiverError] = useState<string>("");

        //validate
        const validateInputs = () => {
            let validate = true;
            if (shippingAddress.trim() === "") {
                setShippingAddressError("Vui lòng nhập địa chỉ giao hàng");
                validate = false;
            } else {
                setShippingAddressError("");
            }
            if (nameReceiver.trim() === "") {
                setNameReceiverError("Vui lòng nhập tên người nhận");
                validate = false;
            } else {
                setNameReceiverError("");
            }
            if (!phoneReceiver.trim() || !/^\d{10}$/.test(phoneReceiver)) {
                setPhoneReceiverError("Vui lòng nhập số điện thoại người nhận hợp lệ");
                validate = false;
            } else {
                setPhoneReceiverError("");
            }
            return validate;
        }

        const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setShippingAddress(value);
            if (value.trim() !== "") {
                setShippingAddressError("");
            }
        };
        
        const handleChangeNameReceiver = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setNameReceiver(value);
            if (value.trim() !== "") {
                setNameReceiverError("");
            }
        };
        
        const handleChangePhoneReceiver = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setPhoneReceiver(value);
            if (value.trim() !== "" && /^\d{10}$/.test(value)) {
                setPhoneReceiverError("");
            }
        };


        // caculate price list item
        const handleSumPriceItem = () => {
            let sum = 0;
            items.forEach(item => {
                sum += item.price;
            });
            setSumPrice(sum);
        }
        useEffect(() => {
            handleSumPriceItem();
        }, [items]);

        const handleChangeQuantityOrder = (sum : number, price: number) => {
            setSumPrice(sum + price);
        }

        const handleUpdateItemQuantity = (itemId: number, count: number) => {
            console.log(count)
            setItemQuantities(prevQuantities => ({
                ...prevQuantities,
                [itemId]: count
            }));
        };


        const handleButtonClick = () => {
            if (scrollToRef.current) {
                (scrollToRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
            }
        }

        const handleClickPayment = async(e: any) => {
            e.preventDefault();
            if (!validateInputs()) {
                return;
            }
            const orderData = {
                userId: 1,
                shippingAddress: shippingAddress,
                nameReceiver: nameReceiver,
                phoneReceiver: phoneReceiver,
                status: "Đã xác nhận",
                priceTotal: sumPrice.toFixed(2),
                orderItems: items.map(item => {
                    return {
                        itemId: item.id,
                        quantity: itemQuantities[item.id] || 1
                    }
                })
            }

            try {
                const response = await axios.post('http://localhost:8000/orders', orderData);
                if (response.status === 200) {
                    console.log('Order added successfully:', response.data);
                    alert('Order added successfully!');
                } else {
                    console.error('Unexpected error:', response.data);
                    alert('Something went wrong. Please try again later.');
                }
            } catch (error) {
                console.error('Unexpected error:', error);
                alert('Something went wrong. Please try again later.');
            }
        };



        return (
            <div className="flex flex-col items-center">
                <div className="flex flex-col gap-5 items-center mb-12">
                    <span className="text-lg font-normal">Xin lưu ý rằng chúng tôi không chấp nhận đổi trả đối với các đơn hàng trực tuyến.</span>
                    <span className="text-[40px] font-bold">Tổng giá trị giỏ hàng của bạn hiện tại là {sumPrice.toLocaleString("vi-VN")} vnd</span>
                    <span className="text-lg font-normal">Vận chuyển là miễn phí đối với mọi đơn hàng</span>
                    <Button onClick={handleButtonClick}>
                        Thanh toán
                    </Button>
                </div>
                <div className="flex flex-col gap-4 w-full items-end">
                    {
                        items.map((item: Item) => {
                            return (
                                <Product 
                                    sum = {sumPrice} 
                                    handle = {handleChangeQuantityOrder} 
                                    onUpdateQuantity={handleUpdateItemQuantity}
                                    key={item.id} 
                                    item={item} />
                            )
                        })
                    }
                    <form className="min-w-[800px]  p-4 flex flex-col items-end">
                        <div className="flex w-full flex-col gap-4">
                            <div className="flex justify-between">
                                <span className="text-xl font-normal">Tổng giá trị</span>
                                <span className="text-xl font-normal">{sumPrice.toLocaleString('vi-VN')} vnd</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-normal">Vận chuyển</span>
                                <span className="text-xl font-normal">Miễn phí</span>
                            </div>
                        </div>
                        <div className="w-full flex justify-between border-t border-gray-400">
                            <span className="text-2xl font-semibold pt-2">Thanh toán toàn bộ</span>
                            <span className="text-2xl font-bold pt-2">{sumPrice.toLocaleString("vi-VN")} vnd</span>
                        </div>
                        <div className="flex items-end">
                            <span className="text-right w-full italic text-xs">Bao gồm thuế GTGT 5.272.546đ</span> 
                        </div>
                        <div className="w-full text-3xl font-bold translate-y-[-8px]">
                            &
                        </div>
                        <div className="w-full flex items-center gap-x-1 ">
                            <Package className="w-5" />
                            <span className="text-lg font-light">Tuỳ chọn giao hàng</span>
                        </div>
                        <div className="w-full flex flex-col gap-2 mb-4">
                            <input
                                onChange={handleChangeAddress}
                                type="text"
                                placeholder="Địa chỉ giao hàng"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                            {shippingAddressError && <span className="text-red-500 text-sm">{shippingAddressError}</span>}
                            <input
                                onChange={handleChangeNameReceiver}
                                type="text"
                                placeholder="Tên người nhận"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                            {nameReceiverError && <span className="text-red-500 text-sm">{nameReceiverError}</span>}
                            <input
                                onChange={handleChangePhoneReceiver}
                                type="tel"
                                placeholder="Số điện thoại người nhận"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                            {phoneReceiverError && <span className="text-red-500 text-sm">{phoneReceiverError}</span>}
                        </div>

                        
                        <Button onClick = {handleClickPayment} ref={scrollToRef} className="w-1/2">
                            Thanh toán
                        </Button>
                    </form>
                </div>
            </div>
        );
}

export default Order;