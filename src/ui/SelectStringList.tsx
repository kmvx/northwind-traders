import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SelectStringList({
  itemsInfo,
  value,
  setValue,
  title,
}: {
  itemsInfo: readonly {
    component?: React.ReactNode;
    value: string;
  }[];
  value: string;
  setValue: (value: string) => void;
  title?: string | undefined;
}) {
  return (
    <Select
      value={value}
      onValueChange={(value: string) => {
        setValue(value);
      }}
    >
      <SelectTrigger title={title}>
        <SelectValue
          placeholder={
            itemsInfo.find((itemInfo) => itemInfo.value === value)?.component
          }
        />
      </SelectTrigger>
      <SelectContent>
        {itemsInfo.map((itemInfo, index) => (
          <SelectItem key={index} value={itemInfo.value}>
            {itemInfo.component ?? String(itemInfo.value)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
