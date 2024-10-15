import { ModeToggle } from "~/components/mode-toogle";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main>
      Hello world
      <Button variant="default">Press me</Button>
      <ModeToggle />
    </main>
  );
}
