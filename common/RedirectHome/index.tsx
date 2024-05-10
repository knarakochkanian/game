'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const RedirectHome = () => {
  const navigate = useRouter().push;

  useEffect(() => {
    navigate('/');
  }, []);

  return <></>;
};

export default RedirectHome;
