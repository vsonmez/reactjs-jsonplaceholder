import { useCallback } from "react";
import GlobalStore from "../store/global.store";
import ApplicationStore from "../store/store";

const useIsLoading = () => {
  const dispatch = ApplicationStore.useAppDispatch();
  const isLoading = ApplicationStore.useAppSelector(
    GlobalStore.select.isLoading
  );
  const setIsLoading = useCallback(
    (status: boolean) => {
      dispatch(GlobalStore.actions.setIsLoading(status));
    },
    [dispatch]
  );

  return {
    isLoading,
    setIsLoading,
  };
};

export default useIsLoading;
