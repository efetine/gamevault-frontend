export interface IProduct {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  stock: number;
  imageUrl: string;
  genreId?: number;
  category?: number;
}

export interface IProductListProps {
  products: IProduct[];
}

export interface IProductsCardProps {
  id: number;
  name: string;
  type: string;
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
