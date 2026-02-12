import Image from 'next/image';

import { cn } from '@/lib/utils';

interface EmployeePhotoProps {
  firstName: string;
  sizeRem?: number;
  priority?: boolean;
  className?: string;
}

const EmployeePhoto: React.FC<EmployeePhotoProps> = ({
  firstName,
  sizeRem,
  className = '',
  priority = false,
}) => {
  const WIDTH = 103;
  const HEIGHT = 118;
  const pixelSize = sizeRem ? sizeRem * 16 : undefined;

  return (
    <Image
      src={`/assets/img/database/${firstName.toLowerCase()}.jpg`}
      alt=""
      title={`${firstName}'s employee photo`}
      className={cn('rounded-md object-cover', className)}
      style={{
        width: sizeRem ? `${sizeRem}rem` : `${WIDTH}px`,
        height: sizeRem ? `${sizeRem}rem` : `${HEIGHT}px`,
      }}
      width={pixelSize ? pixelSize : WIDTH}
      height={pixelSize ? pixelSize : HEIGHT}
      priority={priority}
    />
  );
};

export default EmployeePhoto;
