




import { createContext, useContext, useEffect, useState } from "react";
import { useCategory } from "./CategoryContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : [];
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // ✅ CONNECT CATEGORY CONTEXT
  const { addCategory } = useCategory();

  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

  const addOrUpdateProduct = (product) => {
    // 🔥 AUTO ADD CATEGORY FROM PRODUCT
    if (product.category) {
      addCategory(product.category);
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...product }
            : p
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { id: Date.now(), ...product },
      ]);
    }

    setEditingProduct(null);
    setOpenModal(false);
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?"))
      return;

    setProducts((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        openModal,
        setOpenModal,
        editingProduct,
        setEditingProduct,
        addOrUpdateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () =>
  useContext(ProductContext);
