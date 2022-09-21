import useNearContext from "@context/NearContext";
import { createContext, PropsWithChildren, useContext } from "react";

interface Context {
  signIn(): void;
  signOut(): void;
  isSignedIn(): boolean;
}

export const AuthContext = createContext<Context | undefined>(undefined);

export default function useAuthContext(): Context {
  return useContext(AuthContext) ?? ({} as Context);
}

export function AuthProvider({ children }: PropsWithChildren<unknown>) {
  const { config, walletConnection, reset } = useNearContext();

  function signIn() {
    walletConnection?.requestSignIn(config.contractName);
  }

  function signOut() {
    walletConnection?.signOut();
    reset();
  }

  function isSignedIn() {
    return !!walletConnection?.isSignedIn();
  }

  const value = {
    signIn,
    signOut,
    isSignedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
