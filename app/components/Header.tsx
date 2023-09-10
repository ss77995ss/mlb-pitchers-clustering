'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="p-4 bg-teal-900">
      <nav>
        <Link href="/" className={`mr-4 ${pathname === '/' ? 'text-red-500' : 'text-current'}`}>
          投手分群
        </Link>
        <Link href="/matchup" className={`mr-4 ${pathname === '/matchup' ? 'text-red-500' : 'text-current'}`}>
          投打對決
        </Link>
      </nav>
    </header>
  );
}
