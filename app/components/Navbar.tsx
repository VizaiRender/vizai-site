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

const flags: Record<Lang, string> = { pt: "🇧🇷", en: "🇺🇸", es: "🇪🇸" };
const langOrder: Lang[] = ["pt", "en", "es"];

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
            {flags[lang]}
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
                className={`px-2 py-1.5 rounded-lg transition-colors text-base leading-none ${d ? "hover:bg-white/10" : "hover:bg-black/5"}`}
                aria-label={l}
              >
                {flags[l]}
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
                    className={`text-base leading-none w-8 h-8 flex items-center justify-center rounded-full transition-colors ${d ? "hover:bg-white/10" : "hover:bg-black/5"}`}
                    aria-label={t.nav.changeLanguage}
                  >
                    {flags[lang]}
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
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-xl leading-none transition-colors ${
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
                      {flags[l]}
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
