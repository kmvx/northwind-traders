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

export type SelectStringListInfoType = {
  title?: string | undefined;
  description?: string | null | undefined;
  value: string;
};

interface SelectStringListProps {
  itemsInfo: readonly SelectStringListInfoType[];
  value: string;
  setValue: (value: string) => void;
  title?: string | undefined;
  className?: string | undefined;
}

const SelectStringList: React.FC<SelectStringListProps> = ({
  itemsInfo,
  value,
  setValue,
  title,
  className,
}) => {
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
            title={itemInfo.description ?? ''}
          >
            {!itemInfo.title ? itemInfo.title : String(itemInfo.value)}
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
            itemsInfo.find((itemInfo) => itemInfo.value === value)?.title
          }
        />
      </SelectTrigger>
      <SelectContent className={className}>
        {itemsInfo.map((itemInfo, index) => (
          <SelectItem
            key={index}
            value={itemInfo.value}
            title={itemInfo.description ?? ''}
          >
            {itemInfo.title ?? String(itemInfo.value)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectStringList;
