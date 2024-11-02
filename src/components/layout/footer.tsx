import Link from 'next/link';
import { FaGithub, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { IconComponent } from '../icon/icon.svg';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-5">
      <div className="flew-row mb-4 mt-3 flex justify-center">
        <h1 className="flex items-center text-3xl font-semibold">
          <IconComponent />
          Game Vault
        </h1>
      </div>
      {/* <div className="flew-row my-4 flex columns-auto justify-center gap-2">
        <Link className="hover:text-gray-400" href="/">
          Home
        </Link>
        <Link className="hover:text-gray-400" href="/products">
          Store
        </Link>
        <Link className="hover:text-gray-400" href="/">
          Categories
        </Link>
        <Link className="hover:text-gray-400" href="/">
          About
        </Link>
        <Link className="hover:text-gray-400" href="/">
          Suport
        </Link>
      </div> */}
      <div className="flew-row my-4 flex columns-auto justify-center gap-3 text-2xl">
        <Link href="https://x.com/" target="blank">
          <FaXTwitter />
        </Link>
        <Link href="https://www.instagram.com/" target="blank">
          <FaInstagram />
        </Link>
        <Link href="https://github.com/gamevault-org" target="blank">
          <FaGithub />
        </Link>
        <Link href="https://www.youtube.com/" target="blank">
          <FaYoutube />
        </Link>
      </div>
      <div className="container mx-auto mb-1 mt-7 px-4 text-center text-gray-400">
        © 2024 Game Vault. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
