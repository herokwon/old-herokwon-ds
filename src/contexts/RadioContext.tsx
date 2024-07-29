import { createContext, useContext, useMemo, useState } from 'react';

import type { ElementStatus, PropsWithChildren } from '../types';

interface RadioContextProps {
  isDisabled: boolean;
  selectedId: string;
  onChange: (id: string) => void;
}

type RadioProviderProps = PropsWithChildren<
  Required<Pick<ElementStatus, 'isDisabled'>> & {
    defaultSelectedId: string;
  }
>;

const RadioContext = createContext<RadioContextProps | undefined>(undefined);

export const RadioProvider = ({
  children,
  isDisabled,
  defaultSelectedId,
}: RadioProviderProps) => {
  const [selectedId, setSelectedId] = useState<string>(defaultSelectedId);

  const onChange = (id: string) => {
    setSelectedId(id);
  };

  const value = useMemo(
    () => ({
      isDisabled: isDisabled,
      selectedId: selectedId,
      onChange: onChange,
    }),
    [isDisabled, selectedId],
  );

  return (
    <RadioContext.Provider value={value}>{children}</RadioContext.Provider>
  );
};

export const useRadio = () => useContext(RadioContext);
