import { createTheme, NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import { NearProvider } from "@context/NearContext";
import { AuthProvider } from "../context/AuthContext";

const darkTheme = createTheme({
  type: "dark",
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <NearProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </NearProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
}

export default MyApp;
