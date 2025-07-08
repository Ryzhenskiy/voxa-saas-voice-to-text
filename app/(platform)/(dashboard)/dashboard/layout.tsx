'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Mic } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

const mockHistory = [
  { id: '1', title: 'Meeting with Product Team' },
  { id: '2', title: 'Voice Note – July 7' },
  { id: '3', title: 'Client Call Summary' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950 text-white">
      <aside className="w-[280px] border-r border-neutral-800 p-2 hidden md:flex flex-col bg-neutral-900">
        <Link
          href="/dashboard"
          className={`px-2 py-1 rounded-md gap-x-1 flex ${
            pathname === '/dashboard'
              ? 'bg-neutral-800'
              : 'hover:bg-neutral-700'
          }`}
        >
          <span> [+] New voice</span>
        </Link>
        <span className="text-gray-300 text-xs ml-2 my-2">Voices</span>

        <ScrollArea className="flex-1 h-[calc(100vh-120px)]">
          <div className="space-y-2">
            {mockHistory.map((item) => (
              <Link
                href={`/dashboard/${item.id}`}
                key={item.id}
                className={`block text-left px-2 py-1 rounded-md transition ${
                  pathname === `/dashboard/${item.id}`
                    ? 'bg-neutral-800 '
                    : 'hover:bg-neutral-700'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </ScrollArea>

        <Separator className="my-4" />

        <div className="text-xs text-neutral-400 text-center">© 2025 Voxa</div>
      </aside>
      <div className="flex-col items-center w-full">
        <nav className="border-b border-neutral-800 bg-neutral-900 p-4 flex justify-between">
          <div className="flex items-center gap-x-1">
            <Mic className=" h-6 w-6 text-emerald-500" />
            <h2 className="text-lg font-semibold">Voxa</h2>
          </div>
          <UserButton />
        </nav>
        <main className="">{children}</main>
      </div>
    </div>
  );
}
