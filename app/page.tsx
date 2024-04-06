import axios from 'axios';
import Order from './_component/order';

export default function Home() {
  return (
    <div className="flex-1">
      <div className="max-w-7xl py-4 m-auto">
        <Order />
      </div>
    </div>
  );
}
