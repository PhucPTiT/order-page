"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";
import { Item } from "../page";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ItemProps {
    handle : (a:number, b: number) => void;
    onUpdateQuantity: (a: number, b: number) => void;
    item: Item;
    sum: number;
}

const Product = ({ item, handle, sum, onUpdateQuantity }: ItemProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        onUpdateQuantity(item.id, quantity + 1)
        setQuantity(quantity + 1);
        handle(sum, item.price)
        
    }

    const handleDecrease = () => {
        if (quantity > 1) {
            onUpdateQuantity(item.id, quantity - 1)
            setQuantity(quantity - 1);
            handle(sum, -item.price);
        }
    }

    return (
        <div className="w-full">
            <div className="flex justify-between border-b .border-gray-500 w-full p-2" key={item.id}>
                <div className="max-w-64">
                    <img src={item.image} alt={item.name} />
                </div>
                <div className="flex flex-col min-w-[800px] gap-4 flex-1">
                    <div className="flex justify-between">
                        <div className="flex gap-16 items-start">
                            <p className="flex gap-2 max-w-96">
                                <span className="text-2xl font-bold">{item.name} {item.category}</span>
                            </p>
                            <Carousel key={item.id} className="w-full max-w-10 flex items-center ">
                                <CarouselContent>
                                    {Array.from({ length: 100 }).map((_, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-1">
                                                        <span className="text-xs font-semibold">{index + 1}</span>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious customFunction={handleDecrease}/>
                                <CarouselNext customFunction={handleIncrease}/>
                            </Carousel>
                        </div>
                        <p className="text-2xl font-bold">{(item.price * quantity).toLocaleString('vi-VN')} vnđ</p>
                    </div>
                    <div className="flex justify-between items-start">
                        <p className="text-sm font-normal max-w-[600px]">{item.description}</p>
                        <span className="text-sm font-normal ">{item.quantity} sản phẩm có sẵn</span>
                    </div>
                    <Button variant="default">
                        Xoá
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Product;
