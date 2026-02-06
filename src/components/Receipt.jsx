




import { useState } from "react";
import { FaTimes, FaCheckCircle, FaCreditCard } from "react-icons/fa";
import { SiPaypal } from "react-icons/si";
import { MdPayments } from "react-icons/md";

const Receipt = ({ data, onClose }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [customer, setCustomer] = useState("");

  if (!data) return null;

  const { items, orderType, date } = data;

  // 🔢 LIVE CALCULATION (UI)
  const subtotal = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const discount = subtotal * 0.05;
  const total = subtotal - discount;

  // ✅ SAVE ORDER TO DASHBOARD
  const handleConfirmPayment = () => {
    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      customer: customer || "Guest",
      items,
      subtotal,
      discount,
      total,
      orderType,
      paymentMethod,
      date: new Date().toLocaleString(),
      status: "Paid",
    };

    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      <div className="relative z-10 w-full max-w-sm bg-[#1f2430] rounded-2xl p-6 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <FaTimes />
        </button>

        {!showPayment ? (
          <>
            <h2 className="text-lg font-semibold mb-1">
              Order Receipt
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              {date}
            </p>

            {/* ITEMS */}
            <div className="space-y-2 text-sm">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between"
                >
                  <span>
                    {item.name} ({item.size}) × {item.qty}
                  </span>
                  <span>
                    {(item.qty * item.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-white/10 my-3" />

            {/* TOTALS */}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Discount (5%)</span>
                <span>-{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>{total.toFixed(2)} ₹</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Order Type:{" "}
              <span className="text-orange-400">
                {orderType}
              </span>
            </p>

            <div className="flex items-center justify-center gap-2 text-green-400 mt-4 text-sm">
              <FaCheckCircle />
              Order placed successfully!
            </div>

            <button
              onClick={() => setShowPayment(true)}
              className="w-full mt-5 bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold"
            >
              Proceed To Payment
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-3">
              Payment Method
            </h2>

            <input
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="Customer name"
              className="w-full mb-3 px-3 py-2 rounded bg-[#2b3140]"
            />

            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setPaymentMethod("CARD")}
                className={`flex-1 p-3 rounded ${
                  paymentMethod === "CARD"
                    ? "bg-orange-500"
                    : "bg-[#2b3140]"
                }`}
              >
                <FaCreditCard /> Card
              </button>

              <button
                onClick={() => setPaymentMethod("PAYPAL")}
                className={`flex-1 p-3 rounded ${
                  paymentMethod === "PAYPAL"
                    ? "bg-orange-500"
                    : "bg-[#2b3140]"
                }`}
              >
                <SiPaypal /> Paypal
              </button>

              <button
                onClick={() => setPaymentMethod("CASH")}
                className={`flex-1 p-3 rounded ${
                  paymentMethod === "CASH"
                    ? "bg-orange-500"
                    : "bg-[#2b3140]"
                }`}
              >
                <MdPayments /> Cash
              </button>
            </div>

            <button
              onClick={handleConfirmPayment}
              className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold"
            >
              Confirm Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Receipt;
