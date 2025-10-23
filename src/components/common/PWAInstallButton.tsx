import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Button } from '../ui/button';
import { ArrowDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/useMobile';
export const PWAInstallButton = () => {
  const { installPrompt, handleInstall } = usePWAInstall();
  const isMobile = useIsMobile();

  if (!installPrompt) return null;

  return (
    <>
      {isMobile ? (
        <Button  onClick={handleInstall} className="ml-2"><ArrowDown className='flex w-2 h-2'/></Button >

      ):(
        <Button onClick={handleInstall} variant="default" size="sm" className='flex'>Install</Button>
      )}
    </>
  );
};
