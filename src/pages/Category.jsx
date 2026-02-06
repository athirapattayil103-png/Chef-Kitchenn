


import { useState } from "react";
import { useCategory } from "../context/CategoryContext";
import { useProduct } from "../context/ProductContext";

const Category = () => {
  const { categories, addCategory, deleteCategory } = useCategory();
  const { products } = useProduct(); // ✅ IMPORTANT

  const [openModal, setOpenModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // ➕ ADD / ✏️ UPDATE CATEGORY
  const handleAdd = () => {
    if (!newCategory.trim()) return;

    const exists = categories.some(
      (c, i) =>
        c.name.toLowerCase() === newCategory.toLowerCase() &&
        i !== editIndex
    );

    if (exists) {
      alert("Category already exists");
      return;
    }

    if (editIndex !== null) {
      const updated = [...categories];
      updated[editIndex].name = newCategory;
      localStorage.setItem("categories", JSON.stringify(updated));
    } else {
      addCategory(newCategory);
    }

    setNewCategory("");
    setEditIndex(null);
    setOpenModal(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewCategory(categories[index].name);
    setOpenModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this category?")) {
      deleteCategory(index);
    }
  };

  // ✅ PRODUCT COUNT (LIVE)
  const getProductCount = (categoryName) => {
    return products.filter(
      (p) =>
        p.category?.toLowerCase().trim() ===
        categoryName.toLowerCase().trim()
    ).length;
  };

  // ✅ STOCK COUNT (LIVE)
  const getStockCount = (categoryName) => {
    return products
      .filter(
        (p) =>
          p.category?.toLowerCase().trim() ===
          categoryName.toLowerCase().trim()
      )
      .reduce((sum, p) => sum + Number(p.stock || 0), 0);
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Category</h1>

        <button
          onClick={() => {
            setEditIndex(null);
            setNewCategory("");
            setOpenModal(true);
          }}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg"
        >
          Add Category
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Products</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat, index) => (
              <tr
                key={cat.name}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 capitalize">
                  {cat.name}
                </td>

                <td className="px-6 py-4">
                  {getProductCount(cat.name)}
                </td>

                <td className="px-6 py-4">
                  {getStockCount(cat.name)}
                </td>

                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-3 py-1 text-xs rounded bg-blue-500 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(index)}
                    className="px-3 py-1 text-xs rounded bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-[400px] rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">
              {editIndex !== null
                ? "Edit Category"
                : "Add Category"}
            </h2>

            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-slate-900 text-white rounded"
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
