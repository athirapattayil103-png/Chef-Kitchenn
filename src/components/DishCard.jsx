

const DishCard = ({
  dish,
  selectedSize,
  onSizeSelect,
  onAdd,
  added,
}) => {
  // ✅ ALWAYS SHOW S, M, L (merge with existing)
  const sizes = Array.from(
    new Set([...(dish.sizes || []), "S", "M", "L"])
  );

  // ✅ SAFE PRICE HANDLING
  const prices = dish.prices ?? { S: 0, M: 0, L: 0 };
  const price = prices[selectedSize] ?? prices.M ?? 0;

  // ⚠️ testing mode – allow add
  const isSoldOut = false;

  return (
    <div className="bg-[#2b3140] rounded-2xl p-4 flex flex-col items-center text-center">

      {/* IMAGE */}
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#1f2430] bg-[#1f2430] flex items-center justify-center">
        {dish.image ? (
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-gray-400">
            No Image
          </span>
        )}
      </div>

      {/* NAME */}
      <h3 className="mt-4 text-sm font-semibold capitalize">
        {dish.name}
      </h3>

      {/* PRICE */}
      <p className="text-green-400 font-bold text-sm mt-1">
        ₹ {price}
      </p>

      {/* AVAILABILITY */}
      <p className="text-xs text-gray-400 mt-1">
        {dish.available ?? 0} Bowls available
      </p>

      {/* SIZES */}
      <div className="flex gap-2 mt-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(dish.id, size)}
            className={`w-6 h-6 text-xs rounded ${
              selectedSize === size
                ? "bg-orange-500 text-white"
                : "bg-[#3a4153] text-gray-300"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={() => onAdd(dish, selectedSize)}
        className={`mt-4 w-full py-2 rounded-lg text-sm font-medium ${
          added ? "bg-green-500" : "bg-orange-500"
        }`}
      >
        {added ? "Added" : "+ Add"}
      </button>
    </div>
  );
};

export default DishCard;
