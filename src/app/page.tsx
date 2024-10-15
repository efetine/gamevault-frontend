import { ModeToggle } from "~/components/mode-toogle";
import { Button } from "~/components/ui/button";
import { SteamClone } from "~/components/steam-clone";


export default function HomePage() {
  return (
    <main>
      Hello world
      <Button variant="default">Press me</Button>
      <ModeToggle />
      <SteamClone />

    </main>
  );
}
