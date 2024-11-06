import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { CardContent, CardFooter, Card as Cards } from "~/components/ui/card";
import type { ProductWithCategory } from "~/schemas/product-schema";
import { useAddProductToCart } from "~/state/cart-state";

interface ProductCardProps {
  product: ProductWithCategory;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { mutate: addProduct } = useAddProductToCart();

  const handleAddToCart = () => {
    addProduct({
      productId: product.id,
      qty: 1,
      image: product.imageUrl ?? " ",
      price: product.price,
      category: product.category.name,
      title: product.name,
    });
  };

  return (
    <Cards className="bg-gradient-to-b from-[#9ca3af] via-[#e1e3e7] to-slate-400 dark:bg-gradient-to-b dark:from-[#3e4146] dark:via-[#7c828c] dark:to-slate-800 group w-[300px] overflow-hidden transition duration-700 ease-in-out hover:scale-[1.05]">
      <Link
        className=""
        href={`/product/${product.id}`}
        key={product.id}
      >
        <div className="relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-[150px] w-full object-cover transition-transform duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button variant="secondary" className="dark:text-white text-gray-900">
              See details
            </Button>
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <h3 className="mb-2 truncate text-lg font-bold">{product.name}</h3>
        <div className="mb-2 flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">
            {product.category.name}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        <Button
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Cards>
  );
};
