import { createContext, useContext, useMemo } from 'react';

import type { ElementStatus, PropsWithChildren } from '../types';

type StatusProviderProps = PropsWithChildren<ElementStatus>;

const StatusContext = createContext<ElementStatus | undefined>(undefined);

export const StatusProvider = ({
  children,
  isDisabled,
  isSelected,
  isLoading,
}: StatusProviderProps) => {
  const value = useMemo(
    () => ({
      isDisabled: isDisabled,
      isSelected: isSelected,
      isLoading: isLoading,
    }),
    [isDisabled, isSelected, isLoading],
  );

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
