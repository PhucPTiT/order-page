import axios from 'axios';
import Order from './_component/order';

export interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default async function Home() {
  try {
    const res = await axios.get('http://localhost:9000/items');
    if (!res.data) {
      throw new Error("Không có dữ liệu trả về từ API");
    }
    const items: Item[] = res.data;
    return (
      <div className="flex-1">
        <div className="max-w-7xl py-4 m-auto">
          <Order items={items} />
        </div>
      </div>
    );
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ server:", error.response.data);
    } else if (error.request) {
      console.error("Yêu cầu không có phản hồi từ server:", error.request);
    } else {
      console.error("Lỗi:", error.message);
    }
  }
}
