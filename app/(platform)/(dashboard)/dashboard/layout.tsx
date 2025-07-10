import { Mic } from 'lucide-react';
import { RedirectToSignIn, UserButton } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import Sidebar from '../_components/sidebar';
import { checkSubscription } from '@/lib/subscription';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  const isPro = await checkSubscription();

  if (!userId) {
    return RedirectToSignIn;
  }

  const transcriptions = await db.transcription.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950 text-white">
      <Sidebar transcriptions={transcriptions} />

      <div className="flex-col  w-full">
        <nav className="border-b border-neutral-800 bg-neutral-900 p-4 flex justify-between">
          <div className="flex items-center gap-x-1">
            <Mic className=" h-6 w-6 text-emerald-500" />
            <h2 className="text-lg font-semibold">
              {isPro ? 'Voxa Pro' : 'Voxa'}
            </h2>
          </div>
          <UserButton />
        </nav>
        <main className="h-full flex flex-col items-center justify-center">
          {children}
        </main>
      </div>
    </div>
  );
}
