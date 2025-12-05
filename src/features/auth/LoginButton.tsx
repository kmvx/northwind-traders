import { LogInIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui';

const LoginButton: React.FC = () => {
  return (
    <Button asChild>
      <Link href="/auth/login">
        <LogInIcon />
        Login
      </Link>
    </Button>
  );
};

export default LoginButton;
