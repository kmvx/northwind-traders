'use client';

import { useEffect, useState } from 'react';

import { Input, Spinner } from '@/components/ui';
import { useDebounce } from '@/hooks';
import { cn } from '@/lib/utils';

type DebouncedInputProps = {
  value: string;
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
  const [localValue, setLocalValue] = useState(value);
  const { debouncedValue, isDebouncing } = useDebounce(localValue);

  useEffect(() => {
    setValue(debouncedValue);
  }, [debouncedValue, setValue]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className={cn('relative', className)}>
      <Input
        type="search"
        placeholder={placeholder}
        value={localValue}
        // For performance testing:
        // onChange={(event) => setValue(event.target.value)}
        onChange={(event) => setLocalValue(event.target.value)}
        title={title}
      />
      <span className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground">
        {isDebouncing && <Spinner />}
      </span>
    </div>
  );
};

export default DebouncedInput;
