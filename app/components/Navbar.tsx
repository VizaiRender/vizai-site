"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Download, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang, type Lang } from "./LanguageProvider";
import { useT } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const langOrder: Lang[] = ["pt", "en", "es"];

// Bandeiras estilo emoji (Twemoji) desenhadas como SVG INLINE no DOM. Emoji de
// bandeira não renderiza no Windows; e <img> de SVG falhava de pintar em alguns
// contêineres (ex.: o menu suspenso de idioma). SVG inline renderiza em
// qualquer contexto — é o que o plugin já usa.
function Flag({ lang, className = "w-6 h-6" }: { lang: Lang; className?: string }) {
  const cls = `inline-block shrink-0 ${className}`;
  if (lang === "pt") {
    return (
      <svg viewBox="0 0 36 36" className={cls} aria-hidden>
        <path fill="#009B3A" d="M36 27c0 2.209-1.791 4-4 4H4c-2.209 0-4-1.791-4-4V9c0-2.209 1.791-4 4-4h28c2.209 0 4 1.791 4 4v18z" />
        <path fill="#FEDF01" d="M32.728 18L18 29.124 3.272 18 18 6.875z" />
        <circle fill="#002776" cx="17.976" cy="17.924" r="6.458" />
        <path fill="#CBE9D4" d="M12.277 14.887c-.332.621-.558 1.303-.672 2.023 3.995-.29 9.417 1.891 11.744 4.595.402-.604.7-1.28.883-2.004-2.872-2.808-7.917-4.63-11.955-4.614z" />
        <path fill="#88C9F9" d="M12 18.233h1v1h-1zm1 2h1v1h-1z" />
        <path fill="#55ACEE" d="M15 18.233h1v1h-1zm2 1h1v1h-1zm4 2h1v1h-1zm-3 1h1v1h-1zm3-6h1v1h-1z" />
        <path fill="#3B88C3" d="M19 20.233h1v1h-1z" />
      </svg>
    );
  }
  if (lang === "en") {
    return (
      <svg viewBox="0 0 36 36" className={cls} aria-hidden>
        <path fill="#B22334" d="M35.445 7C34.752 5.809 33.477 5 32 5H18v2h17.445zM0 25h36v2H0zm18-8h18v2H18zm0-4h18v2H18zM0 21h36v2H0zm4 10h28c1.477 0 2.752-.809 3.445-2H.555c.693 1.191 1.968 2 3.445 2zM18 9h18v2H18z" />
        <path fill="#EEE" d="M.068 27.679c.017.093.036.186.059.277.026.101.058.198.092.296.089.259.197.509.333.743L.555 29h34.89l.002-.004c.135-.233.243-.483.332-.741.034-.099.067-.198.093-.301.023-.09.042-.182.059-.275.041-.22.069-.446.069-.679H0c0 .233.028.458.068.679zM0 23h36v2H0zm0-4v2h36v-2H18zm18-4h18v2H18zm0-4h18v2H18zM0 9c0-.233.03-.457.068-.679C.028 8.542 0 8.767 0 9zm.555-2l-.003.005L.555 7zM.128 8.044c.025-.102.06-.199.092-.297-.034.098-.066.196-.092.297zM18 9h18c0-.233-.028-.459-.069-.68-.017-.092-.035-.184-.059-.274-.027-.103-.059-.203-.094-.302-.089-.258-.197-.507-.332-.74.001-.001 0-.003-.001-.004H18v2z" />
        <path fill="#3C3B6E" d="M18 5H4C1.791 5 0 6.791 0 9v10h18V5z" />
        <path fill="#FFF" d="M2.001 7.726l.618.449-.236.725L3 8.452l.618.448-.236-.725L4 7.726h-.764L3 7l-.235.726zm2 2l.618.449-.236.725.617-.448.618.448-.236-.725L6 9.726h-.764L5 9l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L9 9l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L13 9l-.235.726zm-8 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L5 13l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L9 13l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L13 13l-.235.726zm-6-6l.618.449-.236.725L7 8.452l.618.448-.236-.725L8 7.726h-.764L7 7l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 7l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 7l-.235.726zm-12 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L3 11l-.235.726zM6.383 12.9L7 12.452l.618.448-.236-.725.618-.449h-.764L7 11l-.235.726h-.764l.618.449zm3.618-1.174l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 11l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 11l-.235.726zm-12 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L3 15l-.235.726zM6.383 16.9L7 16.452l.618.448-.236-.725.618-.449h-.764L7 15l-.235.726h-.764l.618.449zm3.618-1.174l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 15l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 15l-.235.726z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 36 36" className={cls} aria-hidden>
      <path fill="#C60A1D" d="M36 27c0 2.209-1.791 4-4 4H4c-2.209 0-4-1.791-4-4V9c0-2.209 1.791-4 4-4h28c2.209 0 4 1.791 4 4v18z" />
      <path fill="#FFC400" d="M0 12h36v12H0z" />
      <path fill="#EA596E" d="M9 17v3c0 1.657 1.343 3 3 3s3-1.343 3-3v-3H9z" />
      <path fill="#F4A2B2" d="M12 16h3v3h-3z" />
      <path fill="#DD2E44" d="M9 16h3v3H9z" />
      <ellipse fill="#EA596E" cx="12" cy="14.5" rx="3" ry="1.5" />
      <ellipse fill="#FFAC33" cx="12" cy="13.75" rx="3" ry=".75" />
      <path fill="#99AAB5" d="M7 16h1v7H7zm9 0h1v7h-1z" />
      <path fill="#66757F" d="M6 22h3v1H6zm9 0h3v1h-3zm-8-7h1v1H7zm9 0h1v1h-1z" />
    </svg>
  );
}

function getInitials(user: User): string {
  const name = (user.user_metadata?.full_name as string | undefined) || user.email || "";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (parts[0]?.[0] || "?").toUpperCase();
}

function UserMenu({ user, dark }: { user: User; dark: boolean }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const avatarUrl = (user.user_metadata?.avatar_url as string | undefined) || null;
  const initials = getInitials(user);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-user-menu]")) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [open]);

  return (
    <div className="relative" data-user-menu>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-9 h-9 rounded-full overflow-hidden flex items-center justify-center transition-all border ${
          dark ? "border-white/15 hover:border-white/40" : "border-black/10 hover:border-black/40"
        }`}
        aria-label={t.nav.userMenu}
        aria-expanded={open}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            className={`text-xs font-semibold ${dark ? "text-white" : "text-black"}`}
          >
            {initials}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute right-0 top-full mt-2 min-w-[200px] rounded-xl border shadow-lg overflow-hidden ${
              dark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
            }`}
          >
            <div
              className={`px-3 py-2.5 border-b ${
                dark ? "border-white/10" : "border-black/10"
              }`}
            >
              <p
                className={`text-xs truncate ${dark ? "text-white/50" : "text-black/50"}`}
              >
                {user.email}
              </p>
            </div>
            <Link
              href="/app"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 text-sm transition-colors ${
                dark ? "text-white/80 hover:bg-white/10" : "text-black/80 hover:bg-black/5"
              }`}
            >
              <LayoutDashboard size={14} />
              {t.nav.dashboard}
            </Link>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors text-left ${
                  dark ? "text-white/80 hover:bg-white/10" : "text-black/80 hover:bg-black/5"
                }`}
              >
                <LogOut size={14} />
                {t.nav.logout}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar({ forceDark = false }: { forceDark?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authResolved, setAuthResolved] = useState(false);
  const { lang, setLang } = useLang();
  const t = useT();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setAuthResolved(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthResolved(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Trava o scroll da página enquanto o menu mobile está aberto.
  // O scroll vertical acontece no <html> (documentElement), então travamos ele.
  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const original = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = original;
    };
  }, [menuOpen]);

  const d = forceDark || !mounted ? true : theme === "dark";

  const LangPicker = () => (
    <div className="relative group">
      <button
        className={`p-1.5 rounded-full transition-colors text-base leading-none overflow-hidden w-8 h-8 flex items-center justify-center ${d ? "hover:bg-white/10" : "hover:bg-black/5"}`}
        aria-label={t.nav.language}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={lang}
            initial={{ opacity: 0, y: 8, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.7 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block leading-none"
          >
            <Flag lang={lang} />
          </motion.span>
        </AnimatePresence>
      </button>
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:flex flex-col">
        <div className={`flex flex-col gap-0.5 border rounded-xl p-1.5 shadow-lg ${d ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"}`}>
          {langOrder
            .filter((l) => l !== lang)
            .map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1.5 rounded-lg transition-colors leading-none ${d ? "hover:bg-white/10" : "hover:bg-black/5"}`}
                aria-label={l}
              >
                <Flag lang={l} />
              </button>
            ))}
        </div>
      </div>
    </div>
  );

  const menuBg = d ? "#0a0a0a" : "#ffffff";
  const menuFg = d ? "text-white" : "text-black";
  const menuFgMuted = d ? "text-white/40" : "text-black/30";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4">
        <motion.div
          className={`w-full transition-[padding] duration-300 ${
            scrolled ? "py-2.5 px-5 md:px-6" : "py-4 px-5 md:py-6 md:px-12"
          }`}
          initial={false}
          animate={{
            maxWidth: scrolled ? "64rem" : "100%",
            marginTop: scrolled ? "16px" : "0px",
            borderRadius: scrolled ? "999px" : "0px",
            border: scrolled
              ? `1px solid ${d ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`
              : `1px solid transparent`,
            backgroundColor: scrolled
              ? (d ? "rgba(10,10,10,0.7)" : "rgba(255,255,255,0.8)")
              : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
            boxShadow: scrolled
              ? (d ? "0 10px 40px -10px rgba(0,0,0,0.5)" : "0 10px 40px -10px rgba(0,0,0,0.08)")
              : "none",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
        >
          <nav className="mx-auto flex w-full items-center justify-between">
            <div className="flex items-center gap-12">
              <Link
                href="/"
                onClick={() => {
                  setMenuOpen(false);
                  if (window.location.pathname === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="flex items-center gap-2.5"
              >
                <Image src="/logo.svg" alt="Vizai Render" width={32} height={32} className="rounded-lg" />
                <span className={`font-normal text-lg tracking-tight ${d ? "text-white" : "text-black"}`}>
                  Vizai Render
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-6">
                <Link href="/#pricing" className={`text-sm transition-colors ${d ? "text-white/70 hover:text-white" : "text-black/60 hover:text-black"}`}>
                  {t.nav.plans}
                </Link>
                <Link href="/treinamento" className={`text-sm transition-colors ${d ? "text-white/70 hover:text-white" : "text-black/60 hover:text-black"}`}>
                  {t.nav.training}
                </Link>
                <Link
                  href="/download"
                  className={`text-sm flex items-center gap-1.5 font-medium border px-3 py-1.5 rounded-full transition-colors ${d ? "text-white border-white/20 hover:bg-white/10" : "text-black border-black/20 hover:bg-black/5"}`}
                >
                  <Download size={13} />
                  {t.nav.download}
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Desktop controls */}
              {mounted && (
                <div className="hidden md:flex items-center gap-3">
                  <LangPicker />
                  <div data-theme={d ? "dark" : undefined}>
                    <AnimatedThemeToggler
                      isDark={theme === "dark"}
                      onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
                    />
                  </div>
                </div>
              )}
              {authResolved ? (
                user ? (
                  <div className="hidden md:block">
                    <UserMenu user={user} dark={d} />
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={`hidden md:inline-flex text-sm transition-colors px-4 py-2 ${d ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"}`}
                    >
                      {t.nav.login}
                    </Link>
                    <Link
                      href="/signup"
                      className={`hidden md:inline-flex text-sm font-medium px-4 py-2 rounded-full transition-colors ${d ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/80"}`}
                    >
                      {t.nav.start}
                    </Link>
                  </>
                )
              ) : (
                <div className="hidden md:block w-9 h-9" aria-hidden />
              )}

              {/* Mobile: idioma + theme toggle (só quando menu aberto) + hamburger/X */}
              <div className="md:hidden flex items-center gap-1">
                {mounted && authResolved && !user && (
                  <button
                    onClick={() => {
                      const idx = langOrder.indexOf(lang);
                      setLang(langOrder[(idx + 1) % langOrder.length]);
                    }}
                    className={`leading-none w-8 h-8 flex items-center justify-center rounded-full transition-colors ${d ? "hover:bg-white/10" : "hover:bg-black/5"}`}
                    aria-label={t.nav.changeLanguage}
                  >
                    <Flag lang={lang} />
                  </button>
                )}
                {mounted && menuOpen && (
                  <div data-theme={d ? "dark" : undefined}>
                    <AnimatedThemeToggler
                      isDark={theme === "dark"}
                      onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
                    />
                  </div>
                )}
                <button
                  className={`p-2 rounded-full transition-colors relative z-50 ${d ? "text-white hover:bg-white/10" : "text-black hover:bg-black/5"}`}
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={menuOpen ? "x" : "menu"}
                      initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                      transition={{ duration: 0.15 }}
                      className="block"
                    >
                      {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.span>
                  </AnimatePresence>
                </button>
                {authResolved && user && <UserMenu user={user} dark={d} />}
              </div>
            </div>
          </nav>
        </motion.div>
      </header>

      {/* Mobile full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 md:hidden flex flex-col pt-20 overflow-hidden"
            style={{ backgroundColor: menuBg }}
          >
            {/* Nav links */}
            <nav className="flex flex-col px-8 pt-6 gap-1">
              {[
                { href: "/#pricing", label: t.nav.plans },
                { href: "/treinamento", label: t.nav.training },
                { href: "/download", label: t.nav.download },
              ].map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.25, ease: "easeOut" }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2.5 text-lg font-normal tracking-tight transition-opacity active:opacity-50 ${menuFg}`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex-1" />

            {/* Rodapé: auth + idioma */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.22, ease: "easeOut" }}
              className="px-8 pb-10 flex flex-col gap-5"
            >
              {authResolved && !user && (
                <div className="flex items-center gap-3 w-full">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className={`flex-1 text-center text-base font-medium px-4 py-3.5 rounded-full border transition-colors ${d ? "border-white/20 text-white active:bg-white/10" : "border-black/20 text-black active:bg-black/5"}`}
                  >
                    {t.nav.login}
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className={`flex-1 text-center text-base font-medium px-4 py-3.5 rounded-full transition-colors ${d ? "bg-white text-black active:bg-white/90" : "bg-black text-white active:bg-black/80"}`}
                  >
                    {t.nav.start}
                  </Link>
                </div>
              )}
              {authResolved && user && (
                <div className="flex items-center gap-3">
                  <Link
                    href="/app"
                    onClick={() => setMenuOpen(false)}
                    className={`flex-1 text-center text-base font-medium px-4 py-3.5 rounded-full transition-colors ${d ? "bg-white text-black active:bg-white/90" : "bg-black text-white active:bg-black/80"}`}
                  >
                    {t.nav.dashboard}
                  </Link>
                </div>
              )}
              {authResolved && user && (
                <div className="flex items-center justify-center gap-2">
                  {langOrder.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center leading-none transition-colors ${
                        lang === l
                          ? d
                            ? "bg-white/15"
                            : "bg-black/10"
                          : d
                            ? "hover:bg-white/10"
                            : "hover:bg-black/5"
                      }`}
                      aria-label={l}
                    >
                      <Flag lang={l} className="w-7 h-7" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
