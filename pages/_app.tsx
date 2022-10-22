import { useGarkdownStore } from "@/lib/store/store";
import { THEMES } from "@/lib/styles/theme";
import type { AppProps } from "next/app";
import { useEffect, ReactNode } from "react";
import { ThemeProvider, useColorMode } from "theme-ui";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const theme = useGarkdownStore((store) => store.theme);

  return <ThemeProvider theme={THEMES[theme]}>{children}</ThemeProvider>;
};

const AppMain = ({ Component, pageProps }: AppProps) => {
  const colorMode = useGarkdownStore((store) => store.colorMode);
  const [_, setColorMode] = useColorMode();

  useEffect(() => {
    setColorMode(colorMode);
  }, [colorMode]);

  return <Component {...pageProps} />;
};

const App = (props: AppProps) => (
  <AppProviders>
    <AppMain {...props} />
  </AppProviders>
);

export default App;
