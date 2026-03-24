import { createContext, useContext } from 'react';
import type { MxpContextValue } from './types';

export const MxpContext = createContext<MxpContextValue | null>(null);

/** Access the MxpProvider context. Throws if used outside <MxpProvider>. */
export function useMxpContext(): MxpContextValue {
  const ctx = useContext(MxpContext);
  if (!ctx) {
    throw new Error('useMxpContext must be used within <MxpProvider>');
  }
  return ctx;
}
