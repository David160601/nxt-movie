import Navbar from "../components/global/Navbar";
import "../globals.css";

import Footer from "../components/global/Footer";


export const metadata = {
  title: "Nxt Movie",
  description: "Movie website using Next js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-midBlack text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
