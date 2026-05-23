import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.svg" alt="Vizai Render" width={32} height={32} />
          <span className="text-white font-semibold text-lg tracking-tight">
            Vizai Render
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#pricing" className="text-sm text-white/70 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="#contact" className="text-sm text-white/70 hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm bg-white text-black font-medium px-4 py-2 rounded-full hover:bg-white/90 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
