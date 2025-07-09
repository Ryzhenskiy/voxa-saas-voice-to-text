'use client';

import UploadForm from '../../../../../components/upload-form';

export default function NewTranscriptionPage() {
  return (
    <div className="text-center space-y-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">Ready to transcribe?</h1>
      <p className="text-neutral-400">
        Upload your audio and get the magic transcript.
      </p>

      <UploadForm />
    </div>
  );
}
