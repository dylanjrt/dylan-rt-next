import "./globals.css";
import ClientNav from "./components/ClientNav";

export const metadata = {
  title: "Dylan RT | Musician and Designer",
  description: "Exploring sound and digital design.",
  keywords: "Dylan RT, musician, designer, sound, digital design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClientNav />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
