import "./globals.css";
import './fanta.css'
import Head from "./head";
import AuthProvider from "@/context/AuthContext";

export const metadata = {
  title: "Scribo",
  description: "This is a Markdown notes app with firebase authentication, firestore database and many more features yet to come",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body >
          <div id="app">{children}</div>
          <div id="portal"></div>

        </body>
      </AuthProvider>
    </html>
  );
}
