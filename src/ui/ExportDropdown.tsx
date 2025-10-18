'use client';

import { ChevronDownIcon, DownloadIcon, Loader2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDownload } from '@/hooks';
import { cn } from '@/lib/utils';
import { escapeHtml } from '@/utils';
import {
  convertToCSV,
  convertToJSON,
  convertToMarkdown,
  type DataType,
} from '@/utils/convertTo';

type ExportDropdownProps = {
  data: DataType;
  name: string;
};

const ExportDropdown = ({ data, name }: ExportDropdownProps) => {
  const handleCopyCSV = async () => {
    const text = convertToCSV(data);
    await copyTextToClipboard(text, 'CSV', false);
  };

  const handleCopyMarkdown = async () => {
    const text = convertToMarkdown(data, name);
    await copyTextToClipboard(text, 'Markdown', true);
  };

  const handleCopyJSON = async () => {
    const text = convertToJSON(data);
    await copyTextToClipboard(text, 'JSON', false);
  };

  const { downloadText, isDownloading } = useDownload();

  const handleDownloadCSV = () => {
    downloadText(convertToCSV(data), name, 'csv');
  };

  const handleDownloadMarkdown = () => {
    downloadText(convertToMarkdown(data, name), name, 'md');
  };

  const handleDownloadJSON = () => {
    downloadText(convertToJSON(data), name, 'json');
  };

  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="m-2 flex items-center gap-2"
          disabled={!data?.length}
          title="Export filtered data"
        >
          {isDownloading ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <DownloadIcon className="size-4" />
          )}
          <ChevronDownIcon
            className={cn(
              'size-4 transition-transform',
              open ? 'rotate-180' : 'rotate-0',
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopyCSV}>
          Copy to Clipboard as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyMarkdown}>
          Copy to Clipboard as Markdown
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyJSON}>
          Copy to Clipboard as JSON
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDownloadCSV}>
          Download as CSV file
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownloadMarkdown}>
          Download as Markdown file
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownloadJSON}>
          Download as JSON file
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const copyTextToClipboard = async (
  text: string,
  type: string,
  isMonospace: boolean,
) => {
  try {
    // NOTE: navigator.clipboard isn't available if protocol isn't secure (HTTPS)
    if (isMonospace && navigator.clipboard.write) {
      const html = `<pre style="font-family: monospace">${escapeHtml(text)}</pre>`;

      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': new Blob([text], { type: 'text/plain' }),
          'text/html': new Blob([html], { type: 'text/html' }),
        }),
      ]);
    } else {
      await navigator.clipboard.writeText(text);
    }
    toast.success(`${type} text copied to clipboard!`);
  } catch (err) {
    console.error(`Failed to copy ${type} text to clipboard.`, err);
    toast.error(`Failed to copy ${type} text to clipboard. ${err}`);
  }
};

export default ExportDropdown;
