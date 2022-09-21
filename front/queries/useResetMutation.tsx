import useNearContext from "@context/NearContext";
import { useMutation } from "@tanstack/react-query";

export default function useResetMutation() {
  const { contract } = useNearContext();

  return useMutation(async function reset() {
    return contract?.reset?.();
  });
}
