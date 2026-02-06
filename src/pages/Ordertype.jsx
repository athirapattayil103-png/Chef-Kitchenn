

import { useEffect, useState } from "react";

const Ordertype = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  return (
    <>
      <h1 className="text-xl font-semibold mb-6">
        Orders
      </h1>

      <div className="bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Order Type</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4 text-center">Total</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-6 text-center text-gray-400"
                >
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-3">
                    {o.customer}
                  </td>

                  <td className="px-6 py-3">
                    {o.orderType}
                  </td>

                  <td className="px-6 py-3">
                    {o.paymentMethod}
                  </td>

                  <td className="px-6 py-3 text-center font-semibold">
                    ₹ {o.total.toFixed(2)}
                  </td>

                  <td className="px-6 py-3">
                    {o.date}
                  </td>

                  <td className="px-6 py-3 text-center text-green-600 font-medium">
                    {o.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Ordertype;
