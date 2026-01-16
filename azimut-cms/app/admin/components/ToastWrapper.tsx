'use client';

import { ToastProvider, useToast, setToastRef } from '@/components/admin/Toast';
import { useEffect } from 'react';

function ToastInitializer({ children }: { children: React.ReactNode }) {
  const toastContext = useToast();

  useEffect(() => {
    setToastRef(toastContext);
  }, [toastContext]);

  return <>{children}</>;
}

export function ToastWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <ToastInitializer>{children}</ToastInitializer>
    </ToastProvider>
  );
}
