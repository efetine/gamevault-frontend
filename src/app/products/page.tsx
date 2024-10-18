
import HomeView from "~/views/home/home";

export default function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <HomeView page={Number(searchParams.page ?? 1)} />;
}
