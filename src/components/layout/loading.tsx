import { cn } from "~/lib/utils";

export function Loading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-screen w-full flex-col items-center justify-center gap-3",
        className,
      )}
    >
      <div className="animate-bounce">
        <img
          src="/b2936695e4c1d28d1232842dfd361b9d.jpg"
          alt="Logo de un fantasma con cascos"
          className="h-[60px] rounded-full"
        />
      </div>
      <span>...Loading</span>
    </div>
  );
}
