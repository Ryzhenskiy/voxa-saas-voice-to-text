import { db } from '@/lib/db';

interface PageProps {
  params: Promise<{ voiceId: string }>;
}

export default async function ChatDetailPage({ params }: PageProps) {
  const { voiceId } = await params;

  if (!voiceId) {
    throw new Error('ID is required');
  }

  const audio = await db.transcription.findUnique({
    where: { id: voiceId },
  });

  if (!audio) {
    return <div>Not found</div>;
  }

  return (
    <div className="text-center ">
      <h1 className="text-3xl font-bold">{audio.title}</h1>
      {/* 🎧 Audio Player */}
      {audio.audioUrl && (
        <audio controls className="w-full mt-4">
          <source src={audio.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      <p className="text-neutral-400">{audio.text}</p>
    </div>
  );
}
