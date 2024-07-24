"use client"

import { Inter } from "next/font/google";
import ApolloProviderWrapper from "./components/Apollo/apolloProviderWrapper";
import Navbar from "./components/navbar";
import Layouts from "./components/layouts";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { FilterProvider } from "./contexts/sidenavContext";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {

  const pathname = usePathname();
  return (
    <html lang="en">
      <Head>
        <title>GameBug</title>
        <meta name="GameBug" description="The premier game database and game store" />
      </Head>
      <body className={inter.className}>
        <ApolloProviderWrapper>
          {/* <Layouts> */}
          <main className={pathname === '/games' ? "container wrapper layouts" : (pathname === '/signup' ? "container wrapper layout" : "container wrapper")}>
            <div className={pathname === '/games' ? "before" : (pathname === '/signup' ? "container wrapper after" : "")}></div>
              <FilterProvider>
                <Navbar />
                {children}
              </FilterProvider>
          </main>
          {/* </Layouts> */}
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
