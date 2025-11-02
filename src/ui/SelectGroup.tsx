import { Button, ButtonGroup } from '@/components/ui';

interface SelectGroupProps<T> {
  itemsInfo: readonly {
    component?: string;
    value: T;
  }[];
  state: T;
  setState: (state: T) => void;
  title?: string | undefined;
}

function SelectGroup<T>({
  itemsInfo,
  state,
  setState,
  title,
}: SelectGroupProps<T>) {
  return (
    <ButtonGroup title={title}>
      {itemsInfo.map((itemInfo, index) => (
        <Button
          variant={state === itemInfo.value ? 'default' : 'secondary'}
          onClick={() => setState(itemInfo.value)}
          key={index}
        >
          {itemInfo.component ?? String(itemInfo.value)}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default SelectGroup;
