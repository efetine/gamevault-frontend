import type { IProductsCardProps } from "~/interfaces/IProduct";

const card: React.FC<IProductsCardProps> = ({
  name,
  price,
  stock,
  date,
  image,
}) => {
  return (
    <div className="px-4 py-3 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="p-8 rounded-t-lg max-w-xs transition duration-300 ease-in-out hover:scale-110"
        src={image}
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
        <button className="text-white bg-[#880808] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          VER DETALLE
        </button>
      </div>
    </div>
  );
};

export default card;
