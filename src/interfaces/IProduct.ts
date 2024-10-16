export interface IProduct {
  id: number;
  name: string;
  description: string;
  developer: string;
  date: string;
  price: number;
  stock: number;
  image: string;
  genreId?: number;
}

export interface IProductListProps {
  products: IProduct[];
}

export interface IProductsCardProps {
  id: number;
  name: string;
  price: number;
  stock: number;
  date: string;
  image: string;
}

export interface cartItemProps {
  producto: IProduct;
}
