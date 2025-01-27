"use client";

import { useEffect, useState } from "react";
import { fetchOrders } from "../actions/userActions";

interface Order {
  id: string;
  date: string;
  orderTotal: number;
  items: { id:number; price:number; image:string; name: string; quantity: number }[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const fetchOrder = async () => {
    const res = await fetchOrders();
    if(res.ok){
      setOrders(res);
    }
    return res;
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  console.log(orders);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Your Orders</h1>
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <p className="text-xl font-semibold">Order #{order.id}</p>
                  <p className="text-gray-600">{order.date}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">Total: ${order.total.toFixed(2)}</p>
                </div>
                <ul className="divide-y">
                  {order.items.map((item, index) => (
                    <li key={index} className="py-2 flex justify-between items-center">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-semibold">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">No orders found.</p>
        )}
      </div>
    </div>
  );
}