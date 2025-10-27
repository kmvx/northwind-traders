import { useEffect, useState } from 'react';

type StateType =
  | {
      width: number;
      height: number;
    }
  | undefined;

const getState = (): StateType => {
  return typeof window === 'undefined'
    ? undefined
    : { width: window.innerWidth, height: window.innerHeight };
};

export default function usePageSize(): StateType {
  const [state, setState] = useState<StateType>(getState());

  useEffect(() => {
    const handleResize = () => setState(getState());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return state;
}
