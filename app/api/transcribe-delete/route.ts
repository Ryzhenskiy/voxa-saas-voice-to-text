import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { checkSubscription } from '@/lib/subscription';
import { decreaseAvailableCount } from '@/lib/user-limit';

export async function PUT(req: Request) {
  const isPro = await checkSubscription();
  const { userId } = await auth();
  try {
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    if (!isPro) {
      await decreaseAvailableCount();
    }
    await db.transcription.delete({
      where: {
        id,
        userId,
      },
    });

    return NextResponse.redirect(new URL('/dashboard/new', req.url));
  } catch (error) {
    console.error('DELETE ERROR:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
