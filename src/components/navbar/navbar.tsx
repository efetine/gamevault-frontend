import Link from "next/link";

import { ModeToggle } from "~/components/navbar/mode-toggle";
import { UserMenu } from "~/components/navbar/user-menu";

const Navbar = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-gray-300 py-3 transition-colors duration-200 dark:bg-slate-700">
      <div className="container mx-auto flex items-center justify-center gap-10 px-4 ">
        <div className="w-[60%] flex items-center justify-end ">
          <Link href="/" className="flex flex-row items-center gap-3">
            <img
              src="/b2936695e4c1d28d1232842dfd361b9d.jpg"
              alt="Logo de un fantasma con cascos"
              className="h-[55px] rounded-full"
            />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Game Vault
            </h1>
          </Link>
        </div>
        <div className="w-[45%] flex items-center justify-end space-x-6 ">
          <UserMenu />
          {/* <ModeToggle /> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
