import { ShoppingCart } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { CardContent, CardFooter, Card as Cards } from "~/components/ui/card";
import { Product } from "~/schemas/product-schema";

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <Cards className="group w-[300px] overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-[150px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button variant="secondary" className="text-white">
            Ver detalles
          </Button>
        </div>
      </div>
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
        <Button className="bg-green-600 hover:bg-green-700">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Añadir
        </Button>
      </CardFooter>
    </Cards>
  );
};

export default Card;
