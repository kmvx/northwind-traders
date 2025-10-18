'use client';

import { useCallback, useState } from 'react';

const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadText = useCallback(
    (text: string, filename: string, extension: string): void => {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `${filename}_${new Date().toISOString().split('T')[0]}.${extension}`,
      );
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      const onFocus = () => {
        window.removeEventListener('focus', onFocus);
        setIsDownloading(false);
      };
      window.addEventListener('focus', onFocus);
      setIsDownloading(true);
    },
    [],
  );

  return { downloadText, isDownloading };
};

export default useDownload;
