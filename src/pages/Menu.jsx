

import { useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";

import MenuHeader from "../components/MenuHeader";
import DishCard from "../components/DishCard";
import OrderPanel from "../components/OrderPanel";
import Receipt from "../components/Receipt";

import { useMenu } from "../context/MenuContext";
import { useProduct } from "../context/ProductContext";

const Menu = () => {
  const { cart, setCart, addToCart, orderType, setOrderType } = useMenu();
  const { products } = useProduct();

  const [activeTab, setActiveTab] = useState("all");
  const [now, setNow] = useState(new Date());
  const [selectedSizes, setSelectedSizes] = useState({});
  const [searchText, setSearchText] = useState("");
  const [showOrderType, setShowOrderType] = useState(false);

  const [showCart, setShowCart] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setCart([]);
    localStorage.removeItem("cart");
  }, []);

  const handleSizeSelect = (dishId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [dishId]: size }));
  };

  const handleAdd = (dish, size) => {
    addToCart(dish, size);
  };

  const filteredDishes = products.filter((dish) => {
    const dishCategory = dish.category?.toLowerCase().trim() || "";
    const activeCategory = activeTab.toLowerCase().trim();

    const matchCategory =
      activeCategory === "all" || dishCategory === activeCategory;

    const matchSearch = dish.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <>
      <div className="h-screen bg-[#1f2430] text-white flex overflow-x-hidden">
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            showCart ? "pr-[420px]" : "pr-0"
          }`}
        >
          <MenuHeader
            now={now}
            searchText={searchText}
            setSearchText={setSearchText}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="flex justify-between items-center px-6 mt-6">
            <h2 className="text-lg font-semibold">Choose Dishes</h2>

            <div className="relative z-50">
              <button
                onClick={() => setShowOrderType(!showOrderType)}
                className="bg-[#2b3140] px-4 py-2 rounded-lg text-sm"
              >
                {orderType} ⌄
              </button>

              {showOrderType && (
                <div className="absolute right-0 mt-2 w-36 bg-[#232837] rounded-lg">
                  {["Dine In", "Take away", "Delivery"].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setOrderType(type);
                        setShowOrderType(false);
                      }}
                      className="block w-full px-4 py-2 text-sm hover:bg-[#2b3140]"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {filteredDishes.map((dish) => {
                const normalizedDish = {
                  ...dish,
                  sizes: dish.sizes ?? ["S", "M", "L"],
                  prices:
                    dish.prices ?? { S: 0, M: dish.price ?? 0, L: 0 },
                  available: Number(dish.stock ?? dish.available ?? 0),
                };

                const selectedSize =
                  selectedSizes[dish.id] || normalizedDish.sizes[1];

                return (
                  <DishCard
                    key={dish.id}
                    dish={normalizedDish}
                    selectedSize={selectedSize}
                    onSizeSelect={handleSizeSelect}
                    onAdd={handleAdd}
                    added={cart.some(
                      (i) => i.id === dish.id && i.size === selectedSize
                    )}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#F99147] p-4 rounded-full"
        >
          <IoCartOutline size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <OrderPanel
        orders={cart}
        setOrders={setCart}
        showCart={showCart}
        onClose={() => setShowCart(false)}
        orderType={orderType}
        setOrderType={setOrderType}
        onOrderPlaced={(data) => {
          setReceiptData(data);
          setShowReceipt(true);
        }}
      />

      {showReceipt && (
        <Receipt
          data={receiptData}
          onClose={() => {
            setShowReceipt(false);
            setCart([]);
            localStorage.removeItem("cart");
          }}
        />
      )}
    </>
  );
};

export default Menu;
