'use client';

import { useParams } from 'next/navigation';

const mockHistory = [
  { id: '1', title: 'Meeting with Product Team' },
  { id: '2', title: 'Voice Note – July 7' },
  { id: '3', title: 'Client Call Summary' },
];

export default function ChatDetailPage() {
  const { voiceId } = useParams();

  const chat = mockHistory.find((c) => c.id === voiceId);

  if (!chat) {
    return <div>Not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{chat.title}</h1>
      <p className="text-neutral-400">
        This is the transcription detail page for voice note &quot;{chat.title}
        &quot;.
      </p>
    </div>
  );
}
