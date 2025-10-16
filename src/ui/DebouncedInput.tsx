'use client';

import { LoaderIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Input } from '@/components/ui';
import { useDebounce } from '@/hooks';
import { cn } from '@/lib/utils';

type DebouncedInputProps = {
  value?: string;
  setValue: (value: string) => void;
  placeholder?: string;
  className?: string;
  title?: string;
};

const DebouncedInput = ({
  value,
  setValue,
  placeholder,
  className,
  title,
}: DebouncedInputProps) => {
  const [localValue, setLocalValue] = useState(value ?? '');
  const { debouncedValue, isDebouncing } = useDebounce(localValue);

  useEffect(() => {
    setValue(debouncedValue);
  }, [debouncedValue, setValue]);

  return (
    <div className={cn('relative', className)}>
      <Input
        type="search"
        placeholder={placeholder}
        onChange={(event) => setLocalValue(event.target.value)}
        title={title}
      />
      <span className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground">
        {isDebouncing && <LoaderIcon className="size-4 animate-spin" />}
      </span>
    </div>
  );
};

export default DebouncedInput;
