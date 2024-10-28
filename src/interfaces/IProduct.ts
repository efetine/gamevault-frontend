import { ICategory } from './ICategory';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  stock: number;
  imageUrl: string;
  active: boolean;
  category: ICategory;
}

// export interface IProductListProps {
//   products: IProduct[];
// }

export interface IGetCategoryInProduct {
  name: string;
}

export interface IProductsCardProps {
  id: number;
  name: string;
  price: number;
  stock: number;
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
