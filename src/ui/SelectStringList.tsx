'use client';

import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useIsMobile } from '@/hooks';

export default function SelectStringList({
  itemsInfo,
  value,
  setValue,
  title,
  className,
}: {
  itemsInfo: readonly {
    component?: React.ReactNode;
    value: string;
  }[];
  value: string;
  setValue: (value: string) => void;
  title?: string | undefined;
  className?: string | undefined;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <NativeSelect
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        title={title}
        className={className}
      >
        {itemsInfo.map((itemInfo, index) => (
          <NativeSelectOption
            key={index}
            value={itemInfo.value}
            className="bg-background"
          >
            {itemInfo.component ?? String(itemInfo.value)}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    );
  }

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        setValue(value);
      }}
    >
      <SelectTrigger title={title} className={className}>
        <SelectValue
          placeholder={
            itemsInfo.find((itemInfo) => itemInfo.value === value)?.component
          }
        />
      </SelectTrigger>
      <SelectContent className={className}>
        {itemsInfo.map((itemInfo, index) => (
          <SelectItem key={index} value={itemInfo.value}>
            {itemInfo.component ?? String(itemInfo.value)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
