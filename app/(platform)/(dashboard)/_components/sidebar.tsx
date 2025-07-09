'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { redirect, usePathname } from 'next/navigation';
import { Transcriptions } from '@/types';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

interface SidebarProps {
  transcriptions: Transcriptions;
}

const Sidebar = ({ transcriptions }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  async function handleDelete(id: string) {
    const res = await fetch('/api/transcribe-delete', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (res.redirected) {
      router.push(res.url);
      router.refresh();
    }
  }

  return (
    <aside className="w-[280px] border-r border-neutral-800 p-2 hidden md:flex flex-col bg-neutral-900">
      <Link
        href="/dashboard/new"
        className={`px-2 py-1 rounded-md gap-x-1 flex ${
          pathname === '/dashboard/new'
            ? 'bg-neutral-800'
            : 'hover:bg-neutral-700'
        }`}
      >
        <span> [+] New voice</span>
      </Link>
      <span className="text-gray-300 text-xs ml-2 my-2">Voices</span>

      <ScrollArea className="flex-1 h-[calc(100vh-120px)]">
        <div className="space-y-2">
          {transcriptions.map((item) => (
            <Link
              href={`/dashboard/${item.id}`}
              key={item.id}
              className={`flex justify-between items-center text-left px-2 py-1 rounded-md transition ${
                pathname === `/dashboard/${item.id}`
                  ? 'bg-neutral-800 '
                  : 'hover:bg-neutral-700'
              }`}
            >
              <span className="truncate">{item.title}</span>

              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  handleDelete(item.id);
                }}
              >
                <Trash className="w-4 h-4 hover:scale-110 transition-transform" />
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>

      <Separator className="my-4" />

      <div className="text-xs text-neutral-400 text-center">© 2025 Voxa</div>
    </aside>
  );
};

export default Sidebar;
