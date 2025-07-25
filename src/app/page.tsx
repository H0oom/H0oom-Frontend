'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/auth');
  }, [router]);
  return null;
};

export default page;
