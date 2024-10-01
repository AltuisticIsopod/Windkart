import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "../SessionProvider"
import "../app/globals.css";
import Navbar from "./components/NavBar";
import { getAuthSession } from "./api/auth/[...nextauth]/route"
import { getSession } from "next-auth/react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  console.log(session)

  return (
    <html lang="en">
      <body>
        <AuthProvider session={session}>
          <CartProvider>
            <div className="mb-12">
              <Navbar />
            </div>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
