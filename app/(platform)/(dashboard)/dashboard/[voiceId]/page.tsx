import { db } from '@/lib/db';
import { format } from 'date-fns';
import { FileAudio, Calendar, Text, Hash, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
    return (
      <div className="flex items-center justify-center h-[60vh] bg-neutral-950">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Transcription Not Found
          </h2>
          <p className="text-neutral-400">
            The requested audio transcription could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="container mx-auto px-4 py-8 w-2xl">
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 shadow-lg">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-emerald-500">
                {audio.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-neutral-800 border-neutral-700 text-neutral-300"
                >
                  <FileAudio className="h-4 w-4 text-emerald-500" />
                  {audio.audioUrl?.split('.').pop()?.toUpperCase() || 'AUDIO'}
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-neutral-800 border-neutral-700 text-neutral-300"
                >
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  {format(new Date(audio.createdAt), 'MMM dd, yyyy')}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              {audio.audioUrl && (
                <audio
                  controls
                  className="w-full md:w-64 bg-neutral-800 rounded-lg"
                >
                  <source src={audio.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
              {audio.audioUrl && (
                <Button
                  variant="outline"
                  className="gap-2 bg-neutral-800 border-neutral-700 hover:bg-neutral-700 text-white"
                >
                  <Download className="h-4 w-4 text-emerald-500" />
                  Download
                </Button>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
              <div className="flex items-center gap-2 mb-2">
                <Hash className="h-5 w-5 text-emerald-500" />
                <h3 className="font-semibold text-neutral-300">
                  Transcription ID
                </h3>
              </div>
              <p className="text-sm font-mono bg-neutral-950 p-2 rounded text-neutral-200">
                {audio.id}
              </p>
            </div>

            <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
              <div className="flex items-center gap-2 mb-2">
                <Text className="h-5 w-5 text-emerald-500" />
                <h3 className="font-semibold text-neutral-300">
                  Character Count
                </h3>
              </div>
              <p className="text-2xl font-bold text-emerald-500">
                {audio.text?.length || 0}
              </p>
            </div>
          </div>

          {/* Transcription Section */}
          <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2 text-neutral-300">
                <Text className="h-5 w-5 text-emerald-500" />
                Transcription Text
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-emerald-500 hover:bg-neutral-700"
                // onClick={() => navigator.clipboard.writeText(audio.text || '')}
              >
                Copy Text
              </Button>
            </div>
            <div className="bg-neutral-950 p-4 rounded border border-neutral-700 whitespace-pre-wrap text-neutral-200">
              {audio.text || 'No transcription text available'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
