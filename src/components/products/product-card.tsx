import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { CardContent, CardFooter, Card as Cards } from "~/components/ui/card";
import type { ProductWithCategory } from "~/schemas/product-schema";
import { useCart } from "~/state/cart-state";

interface ProductCardProps {
  product: ProductWithCategory;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  return (
    <Cards className="group w-[300px] overflow-hidden">
      <Link
        className="transition duration-700 ease-in-out hover:scale-[1.05]"
        href={`/product/${product.id}`}
        key={product.id}
      >
        <div className="relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-[150px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button variant="secondary" className="text-white">
              See details
            </Button>
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <h3 className="mb-2 truncate text-lg font-bold capitalize">{product.name}</h3>
        <div className="mb-2 flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs capitalize">
            {product.category.name}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        <Button
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={() => {
            dispatch({
              type: "addProduct",
              payload: {
                productId: product.id,
                category: product.category?.name ?? "N/A",
                title: product.name,
                price: product.price,
                image: product.imageUrl,
                qty: 1,
              },
            });
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Cards>
  );
};
