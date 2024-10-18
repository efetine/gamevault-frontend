import CardList from "~/components/card-list/card-list";
import type { HomeViewProps } from "~/interfaces/IHomeViewPros";



const HomeView = ({ page }: HomeViewProps) => {
  return (
    <div className="w-full justify-center items-center content-center">
      <CardList page={page} />
    </div>
  );
};

export default HomeView;
