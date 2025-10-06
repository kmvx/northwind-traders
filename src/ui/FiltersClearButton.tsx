import { Button } from '@/components/ui';

const FiltersClearButton: React.FC<React.ComponentProps<'button'>> = ({
  ...props
}) => {
  return (
    <Button type="button" variant="outline" {...props}>
      Clear filters
    </Button>
  );
};

export default FiltersClearButton;
