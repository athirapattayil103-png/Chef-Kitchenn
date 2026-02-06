// import { useState } from "react";

// const ProductCard = ({ item }) => {
//   const [activeSize, setActiveSize] = useState(
//     item.sizes?.[0] || null
//   );

//   return (
//     <div className="bg-slate-100 rounded-xl p-4 shadow hover:shadow-md transition">
//       <img
//         src={item.image}
//         alt={item.name}
//         className="w-full h-28 object-contain mb-3"
//       />

//       <h3 className="font-semibold text-sm mb-1">
//         {item.name}
//       </h3>

//       <p className="text-xs text-gray-500 mb-2">
//         {item.available}
//       </p>

//       {/* 🔥 SIZE BUTTONS */}
//       <div className="flex gap-2 mb-3">
//         {item.sizes?.map((size) => (
//           <button
//             key={size}
//             onClick={() => setActiveSize(size)}
//             className={`text-xs px-3 py-1 rounded border transition
//               ${
//                 activeSize === size
//                   ? "bg-blue-500 text-white border-blue-500"
//                   : "bg-white border-gray-300"
//               }`}
//           >
//             {size}
//           </button>
//         ))}
//       </div>

//       <div className="flex justify-between items-center">
//         <span className="font-bold text-sm">
//           ₹{item.price}
//         </span>

//         <span className="text-xs px-2 py-1 bg-blue-200 rounded">
//           {item.typ}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
