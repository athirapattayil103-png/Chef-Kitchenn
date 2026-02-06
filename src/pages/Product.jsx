

import { useState } from "react";
import AddProductModal from "../components/AddProductModal";
import { useProduct } from "../context/ProductContext";
import { useCategory } from "../context/CategoryContext";

const Products = () => {
  const {
    products,
    addOrUpdateProduct,
    deleteProduct,
  } = useProduct();

  const { categories } = useCategory();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="font-semibold text-xl">Products</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white px-4 py-1 rounded"
        >
          Add Product
        </button>
      </div>

      <table className="w-full bg-white rounded table-fixed">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left w-16">Image</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-center w-20">Stock</th>
            <th className="px-4 py-2 text-center w-20">Sizes</th>
            <th className="px-4 py-2 text-left">Order Type</th>
            <th className="px-4 py-2 text-right w-28">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">
                    No Img
                  </span>
                )}
              </td>

              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.category}</td>
              <td className="px-4 py-2 text-center">
                {p.stock}
              </td>
              <td className="px-4 py-2 text-center">
                S, M, L
              </td>
              <td className="px-4 py-2">
                {p.orderType?.join(", ")}
              </td>
              <td className="px-4 py-2">
  <div className="flex justify-end gap-2 whitespace-nowrap">
    <button
      onClick={() => {
        setEditData(p);
        setOpen(true);
      }}
      className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
    >
      Edit
    </button>

    <button
      onClick={() => deleteProduct(p.id)}
      className="bg-red-500 text-white px-3 py-1 rounded text-xs"
    >
      Delete
    </button>
  </div>
</td>


              {/* <td className="px-4 py-2 text-right space-x-2">
                <button
                  onClick={() => {
                    setEditData(p);
                    setOpen(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ IMPORTANT FIX HERE */}
      <AddProductModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        onAdd={addOrUpdateProduct}   // 🔥 THIS WAS MISSING
        categories={categories}
        editData={editData}
      />
    </>
  );
};

export default Products;
