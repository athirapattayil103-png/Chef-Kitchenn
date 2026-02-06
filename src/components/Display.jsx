
import { useState } from "react";
import Menu from "../pages/Menu";
import OrderPanel from "./OrderPanel";
import Sidebar from "./Sidebar";
import Receipt from "./Receipt";
const Display = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderType, setOrderType] = useState("Dine In");
const [receiptData, setReceiptData] = useState(null);

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* SIDEBAR */}
     <div className="hidden md:block sticky top-0 h-screen">
  <Sidebar />
</div>


      {/* MENU */}
<div className="flex-1 overflow-hidden">
        <Menu
          cart={cart}
          setCart={setCart}
          showCart={showCart}
          setShowCart={setShowCart}
          orderType={orderType}
          setOrderType={setOrderType}
        />
      </div>

      {/* ORDER PANEL */}
      {showCart && (
        <OrderPanel
          orders={cart}
          setOrders={setCart}
          showCart={showCart}
          onClose={() => setShowCart(false)}
          orderType={orderType}
          setOrderType={setOrderType}
            onOrderPlaced={(data) => setReceiptData(data)}

        />
        
      )}
      {receiptData && (
  <Receipt
    data={receiptData}
    onClose={() => setReceiptData(null)}
  />
)}
    </div>
  );
};

export default Display;
