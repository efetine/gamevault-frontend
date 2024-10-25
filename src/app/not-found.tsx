import Link from "next/link";

export default function NotFound() {
  return (
      <div className="flex flex-col-reverse lg:flex-row content-center items-center justify-center gap-5 h-screen w-full lg:p-5 bg-slate-400">
        {/* Contenedor de texto */}
        <div className="flex flex-col w-full lg:w-[50%] items-center justify-center lg:p-2 ">
          <p className="font-bold text-center text-xl lg:text-3xl mb-4 lg:mb-8">
            Lo sentimos, no hemos encontrado la página que buscas.
          </p>
          <Link href="/" className="underline text-lg lg:text-xl">
            Volver a la página principal
          </Link>
        </div>

        {/* Contenedor de imagen */}
        <div className="flex items-center justify-center w-full lg:w-[40%] p-5 lg:p-10 ">
          <img
            src="/png2.png"
            alt="unplugged"
            className="w-full h-auto lg:h-[100%]"
          />
        </div>
      </div>
  );
}
