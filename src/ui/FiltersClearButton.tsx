import { Button } from '@/components/ui';

const FiltersClearButton: React.FC<React.ComponentProps<'button'>> = ({
  ...props
}) => {
  return (
    <Button type="button" {...props}>
      Clear filters
    </Button>
  );
};

export default FiltersClearButton;
