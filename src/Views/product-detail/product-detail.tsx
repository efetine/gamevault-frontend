import type { IProduct } from "~/Interfaces/IProduct";

const ProductDetail: React.FC<IProduct> = ({
  price,
  description,
  type,
  stock,
  name,
  imageUrl,
}) => {
  const handleClick = () => {
    alert("agregar producto al carrito");
  };
  const handleBack = () => {
    alert("quieres ir atras");
  };
  return (
    <div className="px-4 py-3 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 space-y-[14px] mt-10">
      <img src={imageUrl} alt={name} />
      <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h2>
      <h2 className="text-wrap font-light">{description}</h2>
      <div className="flex justify-between items-center">
        <span className="text-gray-500 dark:text-gray-400">Type: {type}</span>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          ${price}{" "}
        </p>
        <span className="text-gray-500 dark:text-gray-400">Stock: {stock}</span>
      </div>
      <div className="flex flex-col justify-between gap-4">
        <button
          className="text-white bg-[#001866] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleClick}
        >
          ADD TO CART
        </button>
        <button
          className="text-white bg-[#001866] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleBack}
        >
          GO BACK
        </button>
      </div>
    </div>
    // <div>
    //   <h2>Naraka: Bladepoint</h2>
    //   <p>
    //     Es una experiencia de combate y acción para hasta 60 jugadores con
    //     enfrentamientos cuerpo a cuerpo basados en las artes marciales,
    //     movimientos que desafían la gravedad, héroes personalizables dotados de
    //     habilidades épicas
    //   </p>
    //   <p>developer: 24 Entertainment,</p>
    //   <p>date: 11 AGO 2021</p>
    //   <button>Add to cart</button>
    // </div>
  );
};

export default ProductDetail;
