import Bowser from 'bowser';
import {
  CircleQuestionMarkIcon,
  MonitorIcon,
  PhoneIcon,
  TabletIcon,
} from 'lucide-react';
import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import { capitalizeFirstLetter } from '@/utils';

const CONFIG = {
  desktop: {
    icon: MonitorIcon,
    className: 'u-hue-green',
  },
  tablet: {
    icon: TabletIcon,
    className: 'u-hue-yellow',
  },
  mobile: {
    icon: PhoneIcon,
    className: 'u-hue-blue',
  },
  unknown: {
    icon: CircleQuestionMarkIcon,
    className: 'u-hue-red',
  },
} as const;

const isConfigKey = (key: string): key is keyof typeof CONFIG => key in CONFIG;

interface UserAgentProps {
  userAgent: string | null;
}

const UserAgent: React.FC<UserAgentProps> = ({ userAgent }) => {
  const parsed = useMemo(() => {
    if (!userAgent) return null;
    return Bowser.parse(userAgent);
  }, [userAgent]);

  const platform = parsed?.platform.type;
  const config =
    platform && isConfigKey(platform) ? CONFIG[platform] : CONFIG.unknown;
  const Icon = config.icon;

  return (
    <div title={userAgent ?? ''} className="flex items-center gap-2">
      <div className={cn('rounded-md p-2', config.className)}>
        <Icon />
      </div>
      <div className="flex flex-col">
        <div className="font-bold">
          {parsed
            ? `${parsed.browser.name} ${parsed.browser.version ?? ''} on ${parsed.os.name} ${parsed.os.versionName ?? ''}`
            : 'Unknown device'}
        </div>
        {platform && (
          <div className="text-muted-foreground text-xs">
            {capitalizeFirstLetter(platform)}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAgent;
