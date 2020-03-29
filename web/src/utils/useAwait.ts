import * as React from "react";
import { useBoolean } from "react-use";

const useAwait = <T>(
  asyncFn: T
): [
  boolean,
  T,
  {
    toggle: (nextState?: boolean) => void;
  }
] => {
  const [isLoading, toggle] = useBoolean(false);
  // @ts-ignore
  const fetch: T = React.useCallback(
    async (...args) => {
      toggle(true);
      const data = await (asyncFn as any)(...args);
      toggle(false);
      return data;
    },
    [asyncFn, toggle]
  );
  return [
    isLoading,
    fetch,
    {
      toggle,
    },
  ];
};

export default useAwait;
