
import axios from "axios";

interface Item {
    id: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    image: string;
    category: string;
}

const Order = async () => {
    const res = await axios.get('http://localhost:8000/items');
    const items = res.data;
    console.log(items);
    return (
        <div>
            {
                items.map((item: Item) => {
                    return (
                        <div key={item.id}>
                            <div>
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div>

                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Order;