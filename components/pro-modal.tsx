'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useProModalStore } from '@/hooks/use-pro-modal';
import Image from 'next/image';

const ProModal = () => {
  const proModal = useProModalStore();

  async function handlePayment() {
    const stripeRes = await fetch('/api/stripe/checkout', { method: 'POST' });
    const { url } = await stripeRes.json();
    window.location.href = url;
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-black border-none">
        <DialogTitle hidden />
        <div className="aspect-video relative flex items-center justify-center">
          <Image
            src="/upgrade-plan.png"
            alt="upgrade"
            className="object-cover"
            fill
          />
        </div>
        <div className="text-neutral-300 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">Upgrade to Voxa Pro Today!</h2>
          <p className="text-xs font-semibold text-neutral overflow-auto max-w-xs">
            Get the best experience with Voxa Pro. Enjoy unlimited
            transcriptions, advanced checklists, and enhanced security features.
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited transcriptions</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button className="w-full" onClick={handlePayment}>
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
