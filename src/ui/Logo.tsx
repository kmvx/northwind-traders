import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-4xl font-serif italic font-black drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-300 dark:to-teal-300"
    >
      Northwind Traders
    </Link>
  );
}
