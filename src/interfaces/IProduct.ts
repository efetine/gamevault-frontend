export interface IProduct {
  id: number;
  name: string;
  description: string;
  developer: string;
  date: string;
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
  price: number;
  stock: number;
  date: string;
  imageUrl: string;
}

export interface cartItemProps {
  producto: IProduct;
}

export interface IOurServices {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}
