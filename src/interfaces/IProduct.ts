export interface IProduct {
  id: number;
  name: string;
  description: string;
  developer: string;
  date: string;
  price: number;
  type: string;
  stock: number;
  imageUrl: string;
  genreId?: number;
  category: IGetCategoryInProduct;
}

export interface IProductListProps {
  products: IProduct[];
}

export interface IGetCategoryInProduct {
  name: string;
}

export interface IProductsCardProps {
  id: number;
  name: string;
  price: number;
  stock: number;
  date: string;
  imageUrl: string;
  category: IGetCategoryInProduct;
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
