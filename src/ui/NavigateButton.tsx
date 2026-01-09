'use client';

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui';

interface NavigateButtonProps {
  isMoveBackward: boolean;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ isMoveBackward }) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => (isMoveBackward ? router.back() : router.forward())}
      title={isMoveBackward ? 'Go to the previous page' : 'Go to the next page'}
      disabled={
        isMoveBackward &&
        typeof window !== 'undefined' &&
        window.history.length <= 1
      }
    >
      {isMoveBackward ? (
        <ArrowLeftIcon className="size-[1.2rem]" />
      ) : (
        <ArrowRightIcon className="size-[1.2rem]" />
      )}
    </Button>
  );
};

export default NavigateButton;
