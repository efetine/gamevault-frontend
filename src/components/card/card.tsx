import type { IProductsCardProps } from "~/interfaces/IProduct";

const Card: React.FC<IProductsCardProps> = ({
  name,
  price,
  stock,
  date,
  imageUrl,
}) => {
  return (
    <div className="h-full w-full max-w-sm rounded-lg border border-gray-200 bg-white p-1 shadow dark:border-gray-700 dark:bg-gray-800">
      <img
        className="w-full max-w-xs rounded-t-lg p-2"
        src={imageUrl}
        alt={name}
      />
      <div className="px-5 pb-5">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h2>
        <p>Fecha de Publicacion: {date}</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          Price: ${price}
        </p>
        <p className="text-gray-500 dark:text-gray-400">Stock: {stock}</p>
      </div>
    </div>
  );
};

export default Card;
