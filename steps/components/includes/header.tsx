import Link from "next/link";

export default function Header() {
  return (
    <header className="px-3 py-6 shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href="/">Accueil</Link>
        <ul className="flex items-center space-x-5">
          <li className="transition-colors duration-150 ease-in-out hover:text-hover">
            <Link href="/practitioner">Êtes vous practicien ?</Link>
          </li>
          <li className="transition-colors duration-150 ease-in-out hover:text-hover">
            <Link href="/auth/login">Se connecter</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
