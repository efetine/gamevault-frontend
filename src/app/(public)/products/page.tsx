import HomeView from "~/Views/home/home";

export default function HomePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return <HomeView page={Number(searchParams.page ?? 1)} />;
}
