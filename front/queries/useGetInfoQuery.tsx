import useNearContext from "@context/NearContext";
import { useQuery } from "@tanstack/react-query";

export default function useGetInfoQuery() {
  const { contract, loading } = useNearContext();

  return useQuery(
    ["risiko","info"],
    () => {
        return contract?.info?.()
    },
    {
      enabled: !loading,
    }
  );
}
