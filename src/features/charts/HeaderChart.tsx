import { Typography } from '@/ui';

interface HeaderChartProps {
  name: string;
}

const HeaderChart: React.FC<HeaderChartProps> = ({ name }) => {
  return (
    <Typography.Header2>
      Distribution of count of <u>{name}</u> by countries
    </Typography.Header2>
  );
};

export default HeaderChart;
