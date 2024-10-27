import Link from "next/link";
import { IconComponent } from "../icon/icon.svg";
import { FaXTwitter, FaInstagram, FaGithub, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="dark:bg-gray-800 bg-gray-300 py-5">
      <div className="flex flew-row justify-center mt-3 mb-4">
        <h1 className="flex items-center text-3xl font-semibold"><IconComponent/>Game Vault</h1>
      </div>
      <div className="flex flew-row justify-center my-4 columns-auto gap-2">
        <Link className="hover:text-gray-400" href="/">Home</Link>
        <Link className="hover:text-gray-400" href="/products">Store</Link>
        <Link className="hover:text-gray-400" href="/">Categories</Link>
        <Link className="hover:text-gray-400" href="/">About</Link>
        <Link className="hover:text-gray-400" href="/">Suport</Link>
      </div>
      <div className="flex flew-row justify-center my-4 text-2xl columns-auto gap-3">
        <Link href='https://x.com/' target="blank"><FaXTwitter /></Link>
        <Link href='https://www.instagram.com/' target="blank"><FaInstagram /></Link>
        <Link href='https://github.com/gamevault-org' target="blank"><FaGithub /></Link>
        <Link href='https://www.youtube.com/' target="blank"><FaYoutube /></Link>
      </div>
      <div className="container mx-auto px-4 text-center text-gray-400 mt-7 mb-1">
        © 2024 Pixel Games. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
