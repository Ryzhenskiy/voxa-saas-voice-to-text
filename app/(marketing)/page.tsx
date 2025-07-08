import Link from 'next/link';
import localFont from 'next/font/local';
import { Mic, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const headingFont = localFont({
  src: '../../public/fonts/font.woff2',
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-800 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full max-w-6xl">
        <div className="hidden md:flex justify-center">
          <Image
            src="/logo.png"
            alt="Voxa logo"
            width={400}
            height={400}
            className="animate-fade-in"
          />
        </div>
        <div
          className={cn(
            'flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6',
            headingFont.className
          )}
        >
          <div className="flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium w-max">
            <Sparkles className="h-5 w-5 mr-2" />
            New AI Voice Tool
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Transcribe your voice
            <br /> with <span className="text-emerald-400">Voxa</span>
          </h1>

          <p className="text-neutral-300 text-lg md:text-xl max-w-md">
            Convert your voice to text instantly using cutting-edge AI. Voxa
            helps you transcribe meetings, ideas, and thoughts — accurately,
            quickly, and securely.
          </p>

          <Button className="w-max" size="lg" asChild>
            <Link href="/sign-up">Try Voxa for Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketingPage;
