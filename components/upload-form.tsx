'use client';

import { useState } from 'react';
import { Loader2, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useProModalStore } from '@/hooks/use-pro-modal';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const proModal = useProModalStore();

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('audio', file);

    const res = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      setError('Transcribe error');
    }

    if (res.redirected) {
      router.push(res.url);
      router.refresh();
    }

    if (res.status === 402) {
      proModal.onOpen();
    }

    setLoading(false);
    setFile(null);
  };

  return (
    <div className="space-y-4 text-center">
      <div className="w-full max-w-md mx-auto">
        <input
          id="audio-upload"
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
        />

        <label
          htmlFor="audio-upload"
          className={cn(
            'flex flex-col items-center justify-center border-2 border-dashed border-neutral-600 p-8 rounded-lg cursor-pointer hover:bg-neutral-900 transition text-center'
          )}
        >
          <UploadCloud className="w-10 h-10 mb-2 text-emerald-500" />
          <p className="text-white font-medium">
            {file ? `Selected: ${file.name}` : 'Upload your audio file'}
          </p>
          <p className="text-sm text-neutral-400 mt-1">MP3, WAV, M4A, etc.</p>
        </label>
      </div>

      <Button
        onClick={handleUpload}
        disabled={!file || loading}
        size="lg"
        className="w-full max-w-sm mx-auto cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Transcribing...
          </>
        ) : (
          'Upload & Transcribe'
        )}
      </Button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
