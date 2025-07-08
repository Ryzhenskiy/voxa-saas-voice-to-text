'use client';

import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';

export default function NewTranscriptionPage() {
  return (
    <div className="text-center space-y-6">
      <Mic className="mx-auto h-12 w-12 text-emerald-500" />
      <h1 className="text-3xl font-bold">Ready to transcribe your voice?</h1>
      <p className="text-neutral-400">
        Upload your audio file and let Voxa do the magic ✨
      </p>
      <Button size="lg" variant="default" disabled>
        Upload Audio (coming soon)
      </Button>
    </div>
  );
}
