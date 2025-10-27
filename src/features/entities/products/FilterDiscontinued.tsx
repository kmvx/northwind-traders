import { Button, ButtonGroup } from '@/components/ui';

const BUTTONS_INFO: {
  name: string;
  value: boolean | null;
}[] = [
  { name: 'All', value: null },
  { name: 'Discontinued', value: true },
  { name: 'Active', value: false },
];

export default function FilterDiscontinued({
  filterDiscontinued,
  setDiscontinued,
}: {
  filterDiscontinued: boolean | null;
  setDiscontinued: (value: boolean | null) => void;
}) {
  return (
    <ButtonGroup title="Product discontinued status">
      {BUTTONS_INFO.map((button) => (
        <Button
          variant={
            filterDiscontinued === button.value ? 'default' : 'secondary'
          }
          onClick={() => setDiscontinued(button.value)}
          key={button.name}
        >
          {button.name}
        </Button>
      ))}
    </ButtonGroup>
  );
}
