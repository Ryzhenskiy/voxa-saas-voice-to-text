import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import {
  incrementAvailableCount,
  hasAvailableVoices,
} from '../../../lib/user-limit';
import { checkSubscription } from '@/lib/subscription';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(request: Request): Promise<Response> {
  const { userId } = await auth();
  const formData = await request.formData();
  const file = formData.get('audio') as File;

  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const canCreate = await hasAvailableVoices();
    const isPro = await checkSubscription();

    const res = await openai.audio.transcriptions.create({
      model: 'whisper-1',
      file,
      response_format: 'json',
    });

    let transcription;
    if (!canCreate && !isPro) {
      return NextResponse.json({ error: 'Limit reached' }, { status: 402 });
    } else {
      if (!isPro) {
        await incrementAvailableCount();
      }
      transcription = await db.transcription.create({
        data: {
          title: file.name,
          text: res.text,
          audioUrl: '',
          userId,
        },
      });
    }

    revalidatePath(`/dashboard/${transcription.id}`);

    return NextResponse.redirect(
      new URL(`/dashboard/${transcription.id}`, request.url)
    );
  } catch (error) {
    console.error('Whisper error:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    );
  }
}
