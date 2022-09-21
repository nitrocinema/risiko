import useNearContext from "@context/NearContext";
import { useMutation } from "@tanstack/react-query";

export default function useThrowDicesMutation() {
  const { contract } = useNearContext();

  return useMutation(async function battle(data: any) {
    return await contract?.battle?.({ args: data });
  });
}
