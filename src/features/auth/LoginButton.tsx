import { LogInIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui';

interface LoginButtonProps {
  onClick?: (() => void) | undefined;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return (
    <Button asChild onClick={onClick}>
      <Link href="/auth/login">
        <LogInIcon />
        Login
      </Link>
    </Button>
  );
};

export default LoginButton;
