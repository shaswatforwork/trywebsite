import "./globals.css";
import Link from "next/link";
import { cookies } from "next/headers";

export const metadata = {
  title: "RUDRAVYA • Electronics & Robotics Store",
  description: "Buy Arduino, ESP32, Sensors, DIY Kits, Drones, and Robotics parts."
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  const token = cookies().get("token")?.value;
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
          <div className="container flex items-center justify-between h-16">
            <Link href="/" className="font-bold text-xl gradient-text">RUDRAVYA</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/products" className="hover:underline">Products</Link>
              <Link href="/cart" className="hover:underline">Cart</Link>
              { token ? (
                <>
                  <Link href="/account" className="hover:underline">Account</Link>
                  <Link href="/logout" className="hover:underline">Logout</Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:underline">Login</Link>
                  <Link href="/register" className="hover:underline">Sign up</Link>
                </>
              )}
              <Link href="/admin" className="hover:underline">Admin</Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="border-t">
          <div className="container py-8 text-sm text-slate-500">
            © {new Date().getFullYear()} RUDRAVYA • Made with ❤️ in India
          </div>
        </footer>
      </body>
    </html>
  );
}
