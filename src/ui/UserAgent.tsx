import Bowser from 'bowser';
import {
  CircleQuestionMarkIcon,
  MonitorIcon,
  PhoneIcon,
  TabletIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { capitalizeFirstLetter } from '@/utils';

interface UserAgentProps {
  userAgent: string | null;
}

const UserAgent: React.FC<UserAgentProps> = ({ userAgent }) => {
  const browser = userAgent ? Bowser.getParser(userAgent) : undefined;
  const platformType = browser?.getPlatformType();

  const { platformClassName, Icon } = (() => {
    if (platformType === 'desktop')
      return {
        platformClassName: 'bg-green-500/20 text-green-700 dark:text-green-400',
        Icon: MonitorIcon,
      };
    else if (platformType === 'tablet')
      return {
        platformClassName:
          'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
        Icon: TabletIcon,
      };
    else if (platformType === 'mobile')
      return {
        platformClassName: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
        Icon: PhoneIcon,
      };
    else
      return {
        platformClassName: 'bg-red-500/20 text-red-700 dark:text-red-400',
        Icon: CircleQuestionMarkIcon,
      };
  })();

  return (
    <div title={userAgent ?? ''} className="flex items-center gap-2">
      <div className={cn('rounded-md p-2', platformClassName)}>
        <Icon />
      </div>
      <div className="flex flex-col">
        <div className="font-bold">
          {browser
            ? browser.getBrowserName() + ' on  ' + browser.getOSName()
            : 'Unknown device'}
        </div>
        {platformType && (
          <div className="text-muted-foreground text-xs">
            {capitalizeFirstLetter(platformType)} platform
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAgent;
