import { useCallback, useEffect, useState } from 'react';

type ScrollIntoViewHookProps = {
  targetId: string;
};

const useScrollIntoView = ({ ...props }: ScrollIntoViewHookProps) => {
  const [targetId, setTargetId] = useState<string>(props.targetId);

  useEffect(() => {
    setTargetId(props.targetId);
  }, [props.targetId]);

  return {
    callback: useCallback(() => {
      const delay = setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        clearTimeout(delay);
      }, 100);
    }, [targetId]),
  };
};

export default useScrollIntoView;
