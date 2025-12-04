import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text font-serif text-4xl font-black text-transparent italic drop-shadow-lg dark:from-blue-300 dark:to-teal-300"
    >
      Northwind Traders
    </Link>
  );
}
