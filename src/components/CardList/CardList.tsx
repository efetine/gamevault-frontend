import { productsToPreLoad } from "~/helpers/products";
import Card from "../Card/Card";

const CardList = () => {
  const products = productsToPreLoad;
  return (
    <div>
      <h1>VIDEOJUEGOS</h1>
      <div className="flex flex-wrap items-center justify-between px-16 space-y-[14px] columns-2">
        {products.map((product) => {
          return <Card key={product.id} {...product} />;
        })}
      </div>
    </div>
  );
};

export default CardList;
