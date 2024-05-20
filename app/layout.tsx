import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme";
import { ToastContainer } from "react-toastify";
import StoreProvider from "@/context/storeContext/StoreProvider";
import RenderProvider from "@/context/render/renderProvider";
import Loading from "@/components/layout/Loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <RenderProvider>
              <StoreProvider>
                <ToastContainer />
                <Loading/>
                {children}
              </StoreProvider>
            </RenderProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
