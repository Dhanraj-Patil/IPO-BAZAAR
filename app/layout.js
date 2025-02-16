import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { IpoCommonDataProvider } from "@/app/Context/IpoCommonDataProvider";
import { fetchBasicIpoData } from "@/utils/fetchIpoCommonData";

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const initialData = await fetchBasicIpoData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${poppins.className} antialiased min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <IpoCommonDataProvider initialData={initialData}>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </IpoCommonDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}