// import { productsToPreLoad } from "~/helpers/products";
import Card from "../card/Card";
import { useEffect, useState } from "react";
import { getProductsFromDb } from "~/helpers/products-from-db";
import { IProduct } from "~/interfaces/IProduct";

const CardList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect (async () => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getProductsFromDb();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error searching for products:", error);        
      }
    }
    await fetchProducts();
  }, [])

  return (
    <div>
      <h1>VIDEOJUEGOS</h1>
      <div className="flex flex-wrap items-center justify-between px-16 space-y-[14px] columns-2">
        {products.map((product) => {
          return <Card key={product.id} {...product} />;
        })}
      </div>
    </div>
  );
};

export default CardList;
