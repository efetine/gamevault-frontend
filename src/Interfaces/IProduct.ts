export interface IProduct {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  stock: number;
  imageUrl: string;
  genreId?: number;
}

export interface IProductListProps {
  products: IProduct[];
}

export interface IProductsCardProps {
  id: number;
  name: string;
  type: string;
  price: number;
  imageUrl: string;
}

export interface cartItemProps {
  producto: IProduct;
}
