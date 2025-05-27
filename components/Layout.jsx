import { ThemeProvider } from "next-themes";
import Head from "next/head";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="blue-dark">
      <Head>
        <title>Mon Portfolio</title>
        <meta name="description" content="Portfolio de développement" />
      </Head>
      <div className="min-h-screen bg-white dark:bg-blue-dark-900 transition-colors duration-300">
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </ThemeProvider>
  );
}