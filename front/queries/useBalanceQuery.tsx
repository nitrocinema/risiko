import useAuthContext from "@context/AuthContext";
import useNearContext from "@context/NearContext";
import { useQuery } from "@tanstack/react-query";

export default function useBalanceQuery() {
  const { walletConnection } = useNearContext();
  const { isSignedIn } = useAuthContext();

  return useQuery(
    ["balance", "my"],
    () => walletConnection?.account().getAccountBalance(),
    {
      enabled: !!walletConnection && isSignedIn(),
    }
  );
}
