// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// type ProductCategorySelectorProps = {
//   initialCategory?: string;
//   onCategoryChange: (category: string | undefined) => void;
// };

// export default function ProductCategorySelector({
//   initialCategory,
//   onCategoryChange,
// }: ProductCategorySelectorProps) {
//   const [productCategory, setProductCategory] = useState<string | undefined>(
//     initialCategory,
//   );
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const category = searchParams.get("category");
//     setProductCategory(category ?? undefined);
//   }, [searchParams]);

//   const handleCategoryChange = (category: string | undefined) => {
//     setProductCategory(category);
//     onCategoryChange(category);
//   };

//   return (
//     <div className="mb-4 flex w-full justify-center space-x-4">
//       <button
//         onClick={() => handleCategoryChange(undefined)}
//         className={`rounded px-4 py-2 ${productCategory === undefined ? "bg-gradient-to-r from-blue-900/60 via-indigo-950 to-purple-900/60 p-8 text-center text-white shadow-lg" : "bg-gray-400"}`}
//       >
//         All Products
//       </button>
//       <button
//         onClick={() => handleCategoryChange("digital")}
//         className={`rounded px-4 py-2 ${productCategory === "digital" ? "bg-gradient-to-r from-blue-900/60 via-indigo-950 to-purple-900/60 p-8 text-center text-white shadow-lg" : "bg-gray-400"}`}
//       >
//         Boton 1
//       </button>
//       <button
//         onClick={() => handleCategoryChange("physical")}
//         className={`rounded px-4 py-2 ${productCategory === "physical" ? "bg-gradient-to-r from-blue-900/60 via-indigo-950 to-purple-900/60 p-8 text-center text-white shadow-lg" : "bg-gray-400"}`}
//       >
//         Boton 2
//       </button>
//     </div>
//   );
// }
