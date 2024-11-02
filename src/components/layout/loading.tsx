import { CgSpinner } from 'react-icons/cg';

export function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-4">
      <CgSpinner className="h-8 w-8 animate-spin" />
      <span className="text-2xl font-bold">Loading</span>
    </div>
  );
}
