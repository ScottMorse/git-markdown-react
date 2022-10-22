import { useGarkdownStore } from "@/lib/store/store";
import { THEMES } from "@/lib/styles/theme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "theme-ui";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useGarkdownStore((store) => store.theme);

  return (
    <ThemeProvider theme={THEMES[theme]}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
