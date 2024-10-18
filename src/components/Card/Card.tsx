import type { IProductsCardProps } from "~/interfaces/IProduct";

const Card: React.FC<IProductsCardProps> = ({
  name,
  price,
  stock,
  date,
  imageUrl,
}) => {
  return (
    <div className="px-4 py-3 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full">
      <img
        className="p-8 rounded-t-lg max-w-xs transition duration-300 ease-in-out hover:scale-110"
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
