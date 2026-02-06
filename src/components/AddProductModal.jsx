



import { useEffect, useState } from "react";

const AddProductModal = ({
  open,
  onClose,
  onAdd,
  categories,
  editData,
}) => {
  const [form, setForm] = useState({
    name: "",
    image: "",
    category: "",
    stock: "",
    prices: { S: "", M: "", L: "" },
    orderType: [],
  });

  // ✅ PREFILL WHEN EDIT
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        image: editData.image || "",
        category: editData.category || "",
        stock: editData.stock || "",
        prices: editData.prices || { S: "", M: "", L: "" },
        orderType: editData.orderType || [],
      });
    }
  }, [editData]);

  // 🔥 IMAGE OPTIMIZE (SAFE)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        const MAX_WIDTH = 900;
        if (width > MAX_WIDTH) {
          height = (height * MAX_WIDTH) / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.85;
        let base64 = canvas.toDataURL("image/jpeg", quality);

        while (base64.length > 400000 && quality > 0.3) {
          quality -= 0.05;
          base64 = canvas.toDataURL("image/jpeg", quality);
        }

        setForm((prev) => ({
          ...prev,
          image: base64,
        }));
      };
    };
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (size, value) => {
    setForm({
      ...form,
      prices: { ...form.prices, [size]: value },
    });
  };

  const handleOrderType = (type) => {
    setForm((prev) => ({
      ...prev,
      orderType: prev.orderType.includes(type)
        ? prev.orderType.filter((t) => t !== type)
        : [...prev.orderType, type],
    }));
  };

  const handleSubmit = () => {
    onAdd(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96 space-y-3">
        <h2 className="font-semibold text-lg">
          {editData ? "Edit Product" : "Add Product"}
        </h2>

        {/* NAME */}
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        {/* IMAGE */}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {form.image?.startsWith("data:image") && (
          <img
            src={form.image}
            alt="preview"
            className="w-20 h-20 object-cover rounded"
          />
        )}

        {/* ✅ CATEGORY (FIXED) */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Category</option>

          {categories.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* STOCK */}
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        {/* PRICES */}
        <div className="flex gap-2">
          {["S", "M", "L"].map((s) => (
            <input
              key={s}
              placeholder={`${s} Price`}
              value={form.prices[s]}
              onChange={(e) =>
                handlePriceChange(s, e.target.value)
              }
              className="border p-2 w-full"
            />
          ))}
        </div>

        {/* ORDER TYPE */}
        <div className="flex gap-3 text-sm">
          {["DINE_IN", "TAKEAWAY", "DELIVERY"].map((t) => (
            <label key={t}>
              <input
                type="checkbox"
                checked={form.orderType.includes(t)}
                onChange={() => handleOrderType(t)}
              />{" "}
              {t}
            </label>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;

