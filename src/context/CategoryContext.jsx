
// import { createContext, useContext, useEffect, useState } from "react";
// import { dishes } from "../constants/dishes";

// const CategoryContext = createContext();

// export const CategoryProvider = ({ children }) => {
//   const getInitialCategories = () => {
//     const stored = localStorage.getItem("categories");
//     if (stored) return JSON.parse(stored);

//     return Array.from(
//       new Map(
//         dishes.map((item) => [
//           item.category,
//           { name: item.category, status: true },
//         ])
//       ).values()
//     );
//   };

//   const [categories, setCategories] = useState(getInitialCategories);

//   useEffect(() => {
//     localStorage.setItem(
//       "categories",
//       JSON.stringify(categories)
//     );
//   }, [categories]);

//   const addCategory = (name) => {
//     if (!name) return;

//     setCategories((prev) => {
//       const exists = prev.some(
//         (c) =>
//           c.name.toLowerCase() === name.toLowerCase()
//       );

//       if (exists) return prev;

//       return [...prev, { name, status: true }];
//     });
//   };

//   const toggleCategory = (index) => {
//     setCategories((prev) =>
//       prev.map((cat, i) =>
//         i === index
//           ? { ...cat, status: !cat.status }
//           : cat
//       )
//     );
//   };

//   const deleteCategory = (index) => {
//     setCategories((prev) =>
//       prev.filter((_, i) => i !== index)
//     );
//   };

//   return (
//     <CategoryContext.Provider
//       value={{
//         categories,
//         addCategory,
//         toggleCategory,
//         deleteCategory,
//       }}
//     >
//       {children}
//     </CategoryContext.Provider>
//   );
// };

// export const useCategory = () =>
//   useContext(CategoryContext);

import { createContext, useContext, useEffect, useState } from "react";
import { dishes } from "../constants/dishes";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const getInitialCategories = () => {
    const stored = localStorage.getItem("categories");
    if (stored) return JSON.parse(stored);

    return Array.from(
      new Map(
        dishes.map((item) => [
          item.category,
          { name: item.category, status: true },
        ])
      ).values()
    );
  };

  const [categories, setCategories] = useState(getInitialCategories);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addCategory = (name) => {
    if (!name) return;

    setCategories((prev) => {
      const exists = prev.some(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );
      if (exists) return prev;
      return [...prev, { name, status: true }];
    });
  };

  const toggleCategory = (index) => {
    setCategories((prev) =>
      prev.map((cat, i) =>
        i === index ? { ...cat, status: !cat.status } : cat
      )
    );
  };

  const deleteCategory = (index) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, toggleCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
