'use client';

import React, { useEffect, useState } from 'react';

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

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value,
  setValue,
  placeholder,
  className,
  title,
}) => {
  const [localValue, setLocalValue] = useState(value);

  const { debouncedValue, isDebouncing } = useDebounce(localValue);

  // const debouncedValue = useDeferredValue(localValue);
  // const isDebouncing = false;

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
      <span className="text-muted-foreground absolute top-1/2 right-10 -translate-y-1/2">
        {isDebouncing && <Spinner />}
      </span>
    </div>
  );
};

export default DebouncedInput;
