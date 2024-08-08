"use client"

import { Inter } from "next/font/google";
import ApolloProviderWrapper from "./components/Apollo/apolloProviderWrapper";
import Navbar from "./components/navbar";
import Layouts from "./components/layouts";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { FilterProvider } from "./contexts/sidenavContext";
import { LoggedProvider } from "./contexts/loginContext";
import { ReviewProvider } from "./contexts/reviewContext";
import { useParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {

  const pathname = usePathname();
  const isIntegerPathname = /^\/\d+$/.test(pathname);
  return (
    <html lang="en">
      <Head>
        <title>GameBug</title>
        <meta name="GameBug" description="The premier game database and game store" />
      </Head>
      <body className={inter.className}>
        <ApolloProviderWrapper>
          {/* <Layouts> */}
          <main className={isIntegerPathname ? "container wrapper layouts" : (pathname === '/signup' ? "container wrapper layout" : (pathname === '/login' ? "container wrapper layout" : "container wrapper"))}>
            <div className={isIntegerPathname ? "before" : (pathname === '/signup' ? "container wrapper after" : (pathname === '/login' ? "container wrapper after" : ""))}></div>
            <LoggedProvider>
              <FilterProvider>
                <ReviewProvider>
                  <Navbar />
                  {children}
                </ReviewProvider>
              </FilterProvider>
            </LoggedProvider>
          </main>
          {/* </Layouts> */}
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
