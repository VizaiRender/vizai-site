"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { clarityEvent, clarityTag, isRecordablePath, track } from "@/lib/analytics";

/** Marcos de rolagem. 90 existe porque quase nenhuma página chega a 100 de
 *  verdade (rodapé, barra do celular), e sem ele "leu até o fim" some. */
const DEPTH_STEPS = [25, 50, 75, 90, 100];

/** Teto do texto que vira rótulo de clique. Botão é curto; parágrafo inteiro
 *  no relatório não ajuda ninguém e ainda estoura o limite do GA4. */
const MAX_LABEL = 60;

function cleanLabel(raw: string | null | undefined): string {
  if (!raw) return "";
  return raw.replace(/\s+/g, " ").trim().slice(0, MAX_LABEL);
}

/** Nome estável da seção. Prioridade: o que eu marquei à mão, depois a âncora
 *  que já existe, e só então a posição — assim renomear um título não embaralha
 *  o relatório histórico. */
function sectionName(el: Element, index: number): string {
  const marked = (el as HTMLElement).dataset?.trackSection;
  if (marked) return marked;
  if (el.id) return el.id;
  return `section_${String(index + 1).padStart(2, "0")}`;
}

function topLevelSections(): HTMLElement[] {
  // Sem <main> não há seções pra medir: é uma tela de fluxo (login, cadastro),
  // não uma página de conteúdo. Medir os filhos do <body> ali só geraria nomes
  // sem significado ("section_04") sujando o relatório. A profundidade de
  // rolagem continua valendo nessas telas.
  const main = document.querySelector("main");
  if (!main) return [];
  return Array.from(main.children).filter(
    (el): el is HTMLElement =>
      el instanceof HTMLElement && !el.hasAttribute("data-track-ignore"),
  );
}


/**
 * Quanto da seção precisa ter passado pela janela pra ela contar como vista.
 *
 * "Metade da seção" resolve o caso normal. Seção mais alta que o dobro da
 * janela nunca alcançaria essa marca, então pra ela vale "metade da janela".
 */
function seenThreshold(height: number, viewport: number): number {
  return Math.min(height * 0.5, viewport * 0.5);
}

/**
 * Mede o comportamento nas páginas públicas: onde a pessoa clica, até onde ela
 * rola, quais seções ela chega a ver e em que ponto ela desiste.
 *
 * Roda SÓ onde a gravação de sessão roda (mesma regra do Clarity, em
 * lib/analytics.ts). Na área logada o rótulo de um clique poderia carregar o
 * nome de um projeto de cliente, e isso não tem por que sair daqui.
 */
export function BehaviorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isRecordablePath(pathname)) return;

    // Estado por página. Zera a cada troca de rota, senão a segunda página
    // herdaria os marcos já disparados da primeira e sairia do relatório.
    const firedDepth = new Set<number>();
    const seenSections = new Set<string>();
    let maxDepth = 0;
    let lastSection = "";
    let lastSectionIndex = 0;
    let exitSent = false;
    let ticking = false;
    // Instância desmontada não mede mais nada. Sem isso, a medida já agendada
    // rodava DEPOIS da limpeza e mandava a seção de novo — o "hero" aparecia
    // duas vezes por visita e inflava a contagem da primeira dobra.
    let disposed = false;
    let rafId = 0;

    // --- Cliques -----------------------------------------------------------
    const onClick = (ev: MouseEvent) => {
      const target = ev.target;
      if (!(target instanceof Element)) return;
      const el = target.closest<HTMLElement>(
        "a, button, [role='button'], [data-track]",
      );
      if (!el) return;

      // Campo de formulário nunca vira evento: é por ali que passa o que a
      // pessoa digita.
      if (el.closest("input, textarea, select")) return;

      const label =
        cleanLabel(el.dataset.track) ||
        cleanLabel(el.getAttribute("aria-label")) ||
        cleanLabel(el.textContent) ||
        cleanLabel(el.getAttribute("title")) ||
        el.tagName.toLowerCase();

      // SÓ seção marcada à mão. Aceitar qualquer <section> aqui era um bug:
      // um botão dentro de uma section aninhada e sem nome caía no ramo da
      // posição, que recebia o índice da última seção ROLADA — número real,
      // significado errado, do tipo que ninguém desconfia olhando o relatório.
      const holder = el.closest<HTMLElement>("[data-track-section]");
      const params: Record<string, unknown> = {
        label,
        section: holder?.dataset.trackSection || lastSection || "unknown",
        element: el.tagName.toLowerCase() === "a" ? "link" : "button",
        page_path: pathname,
      };

      if (el instanceof HTMLAnchorElement && el.href) {
        try {
          const u = new URL(el.href, window.location.href);
          // Só caminho e âncora. A query fica de fora de propósito: é onde
          // token de sessão e código de login viajam.
          // Teto de 100 porque é onde o GA4 corta valor de parâmetro. Melhor
          // cortar aqui, sabendo, do que descobrir depois que os endereços
          // longos de /treinamento chegaram truncados no relatório.
          params.link_url = (
            u.origin === window.location.origin
              ? u.pathname + u.hash
              : u.origin + u.pathname
          ).slice(0, 100);
          params.outbound = u.origin !== window.location.origin;
        } catch {
          /* href estranho: manda o clique sem destino */
        }
      }

      // O clique que REALMENTE baixa o arquivo ganha nome próprio no Clarity.
      // O atributo `download` é o que separa o botão de verdade dos links de
      // menu e rodapé, que têm o mesmo texto e só navegam. Com isso o funil do
      // Clarity passa a contar download de verdade, sem depender de o painel
      // adivinhar o que é botão pelo texto escrito nele.
      if (el instanceof HTMLAnchorElement && el.hasAttribute("download")) {
        clarityEvent("download_plugin");
      }

      track("element_click", params);
    };

    // --- Profundidade de rolagem -------------------------------------------
    const measure = () => {
      ticking = false;
      if (disposed) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct =
        scrollable <= 0
          ? 100
          : Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      if (pct > maxDepth) maxDepth = pct;

      for (const step of DEPTH_STEPS) {
        if (pct >= step && !firedDepth.has(step)) {
          firedDepth.add(step);
          track("scroll_depth", { percent: step, page_path: pathname });
        }
      }

      sweepSections();
    };

    // Duas medidas por rolagem, de propósito. A do quadro mantém a coisa fluida;
    // a de 150ms depois do último evento existe porque o acelerador por quadro
    // engole medidas em rolagem rápida (dedo no trackpad, rodinha acelerada) e
    // seção inteira sumia do relatório. A segunda também pega o lugar onde a
    // pessoa efetivamente parou, que é o dado que a gente quer.
    let restTimer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      if (disposed) return;
      clearTimeout(restTimer);
      restTimer = setTimeout(measure, 150);
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(measure);
    };

    // --- Seções vistas ------------------------------------------------------
    // Varredura, não IntersectionObserver: o observer só avisa quando um
    // limiar é cruzado, e numa rolagem rápida o navegador engole avisos —
    // seção inteira sumia do relatório. Aqui a conta é refeita a cada quadro
    // de rolagem, então não existe momento pra perder.
    const sections = topLevelSections();
    const named = sections.map((el, i) => ({
      el,
      name: sectionName(el, i),
      index: i + 1,
    }));

    // O critério é o ponto MAIS FUNDO que a janela já alcançou, não o que está
    // na tela neste instante. Medir por instante depende de o navegador me dar
    // um quadro na hora certa, e em rolagem rápida ele não dá — seção inteira
    // sumia do relatório, e sumia uma diferente a cada teste.
    let deepestReach = 0;

    const sweepSections = () => {
      const vh = window.innerHeight;
      deepestReach = Math.max(deepestReach, window.scrollY + vh);
      for (const s of named) {
        const r = s.el.getBoundingClientRect();
        // Altura zero: ainda não carregou (vídeo, demo, galeria). Volta na
        // próxima varredura, quando o conteúdo chegar.
        if (r.height <= 0) continue;
        const topInDoc = r.top + window.scrollY;
        if (deepestReach < topInDoc + seenThreshold(r.height, vh)) continue;
        if (s.index > lastSectionIndex) {
          lastSectionIndex = s.index;
          lastSection = s.name;
        }
        if (seenSections.has(s.name)) continue;
        seenSections.add(s.name);
        track("section_view", {
          section: s.name,
          section_index: s.index,
          page_path: pathname,
        });
      }
    };

    // --- Onde ela parou -----------------------------------------------------
    // Este é o evento que responde a pergunta original. Sai quando a aba some
    // (fechar, trocar de aba, voltar), que é o único momento em que o navegador
    // ainda deixa mandar alguma coisa.
    const sendExit = () => {
      if (exitSent) return;
      // Nada medido é nada pra contar. Sem esta trava, toda remontagem do
      // componente cuspiria um "saiu com 0%" e puxaria a média pra baixo.
      if (maxDepth === 0 && seenSections.size === 0) return;
      exitSent = true;
      track("page_exit", {
        max_scroll: maxDepth,
        last_section: lastSection || "none",
        last_section_index: lastSectionIndex,
        sections_seen: seenSections.size,
        page_path: pathname,
      });
      // Etiqueta a gravação inteira no Clarity: dá pra filtrar "me mostra quem
      // não passou dos 25%" e assistir.
      clarityTag("max_scroll", String(Math.floor(maxDepth / 25) * 25));
      if (lastSection) clarityTag("last_section", lastSection);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") sendExit();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", sendExit);

    // Primeira medida na mão: página curta (ou entrada com âncora) já nasce
    // rolada, e sem isso o marco nunca dispararia.
    rafId = requestAnimationFrame(measure);

    // Vídeo, demo e galeria só ganham altura depois que o conteúdo chega. Se
    // isso acontecer com a rolagem parada, nada dispararia a varredura — daí
    // o observador de tamanho.
    const resize = new ResizeObserver(() => {
      if (!ticking && !disposed) {
        ticking = true;
        rafId = requestAnimationFrame(measure);
      }
    });
    sections.forEach((el) => resize.observe(el));

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      sendExit();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", sendExit);
      resize.disconnect();
      clearTimeout(restTimer);
    };
  }, [pathname]);

  return null;
}
