import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "PULITA — Lembre-se do lixo na hora certa / Ricorda i rifiuti" },
      {
        name: "description",
        content:
          "PULITA: lembrete simples para colocar o lixo certo no dia certo. Promemoria semplice per il giorno giusto della raccolta.",
      },
    ],
  }),
});

type Lang = "pt" | "it";
type WasteKey = "organic" | "plastic" | "glass" | "paper" | "mixed" | "none";

const WASTE: Record<
  WasteKey,
  {
    label: Record<Lang, string>;
    icon: string;
    bg: string;
    fg: string;
    tip: Record<Lang, string>;
  }
> = {
  organic: {
    label: { pt: "Orgânico", it: "Organico" },
    icon: "🍎",
    bg: "bg-[var(--waste-organic)]",
    fg: "text-[var(--waste-organic-fg)]",
    tip: {
      pt: "Restos de comida, cascas, borras de café, restos de jardim.",
      it: "Avanzi di cibo, bucce, fondi di caffè, scarti di giardino.",
    },
  },
  plastic: {
    label: { pt: "Plástico / Metal", it: "Plastica / Metallo" },
    icon: "🥤",
    bg: "bg-[var(--waste-plastic)]",
    fg: "text-[var(--waste-plastic-fg)]",
    tip: {
      pt: "Garrafas PET, embalagens, latas, pacotes de bebida.",
      it: "Bottiglie PET, imballaggi, lattine, brick di bevande.",
    },
  },
  glass: {
    label: { pt: "Vidro", it: "Vetro" },
    icon: "🍾",
    bg: "bg-[var(--waste-glass)]",
    fg: "text-[var(--waste-glass-fg)]",
    tip: {
      pt: "Garrafas e frascos de vidro. Sem tampas nem espelhos.",
      it: "Bottiglie e barattoli di vetro. Senza tappi né specchi.",
    },
  },
  paper: {
    label: { pt: "Papel / Cartão", it: "Carta / Cartone" },
    icon: "📦",
    bg: "bg-[var(--waste-paper)]",
    fg: "text-[var(--waste-paper-fg)]",
    tip: {
      pt: "Caixas, jornais, revistas. Dobre o cartão.",
      it: "Scatole, giornali, riviste. Piega il cartone.",
    },
  },
  mixed: {
    label: { pt: "Indiferenciado", it: "Indifferenziato" },
    icon: "🗑️",
    bg: "bg-[var(--waste-mixed)]",
    fg: "text-[var(--waste-mixed-fg)]",
    tip: {
      pt: "Tudo o que não pode ser reciclado. Saco bem fechado.",
      it: "Tutto ciò che non è riciclabile. Sacchetto ben chiuso.",
    },
  },
  none: {
    label: { pt: "Sem recolha", it: "Nessuna raccolta" },
    icon: "🚫",
    bg: "bg-[var(--waste-none)]",
    fg: "text-[var(--waste-none-fg)]",
    tip: {
      pt: "Não coloque lixo na rua hoje. Guarde para o próximo dia.",
      it: "Non esporre rifiuti oggi. Conservali per il prossimo giorno.",
    },
  },
};

const SCHEDULE: {
  name: Record<Lang, string>;
  short: Record<Lang, string>;
  items: WasteKey[];
}[] = [
  { name: { pt: "Domingo", it: "Domenica" }, short: { pt: "Dom", it: "Dom" }, items: ["none"] },
  { name: { pt: "Segunda", it: "Lunedì" }, short: { pt: "Seg", it: "Lun" }, items: ["organic"] },
  { name: { pt: "Terça", it: "Martedì" }, short: { pt: "Ter", it: "Mar" }, items: ["plastic"] },
  { name: { pt: "Quarta", it: "Mercoledì" }, short: { pt: "Qua", it: "Mer" }, items: ["glass", "organic"] },
  { name: { pt: "Quinta", it: "Giovedì" }, short: { pt: "Qui", it: "Gio" }, items: ["mixed"] },
  { name: { pt: "Sexta", it: "Venerdì" }, short: { pt: "Sex", it: "Ven" }, items: ["paper", "organic"] },
  { name: { pt: "Sábado", it: "Sabato" }, short: { pt: "Sáb", it: "Sab" }, items: ["plastic"] },
];

const T = {
  tagline: { pt: "Lixo certo, dia certo.", it: "Rifiuto giusto, giorno giusto." },
  today: { pt: "Hoje", it: "Oggi" },
  putToday: { pt: "Coloque hoje:", it: "Esponi oggi:" },
  noneToday: { pt: "Sem recolha hoje", it: "Nessuna raccolta oggi" },
  reminderOn: { pt: "🔔 Lembrete ativo", it: "🔔 Promemoria attivo" },
  reminderOff: { pt: "Ativar lembrete diário", it: "Attiva promemoria giornaliero" },
  tomorrow: { pt: "Amanhã", it: "Domani" },
  weekCalendar: { pt: "Calendário da semana", it: "Calendario settimanale" },
  todayBadge: { pt: "HOJE", it: "OGGI" },
  noPickupNote: {
    pt: "Aos domingos e feriados não há recolha.",
    it: "La domenica e nei giorni festivi non c'è raccolta.",
  },
  guide: { pt: "Guia dos resíduos", it: "Guida ai rifiuti" },
  finesTitle: {
    pt: "Coimas por colocar o lixo errado",
    it: "Sanzioni per i rifiuti sbagliati",
  },
  finesIntro: {
    pt: "Colocar o resíduo errado no dia errado prejudica toda a recolha. Valores indicativos:",
    it: "Esporre il rifiuto sbagliato nel giorno sbagliato compromette la raccolta. Importi indicativi:",
  },
  fine1Level: { pt: "Aviso", it: "Avviso" },
  fine1Desc: {
    pt: "Primeira infração. Notificação por escrito.",
    it: "Prima infrazione. Notifica scritta.",
  },
  fine2Level: { pt: "Coima", it: "Sanzione" },
  fine2Desc: {
    pt: "Resíduo no dia errado ou fora do contentor correto.",
    it: "Rifiuto nel giorno sbagliato o nel contenitore errato.",
  },
  fine3Level: { pt: "Grave", it: "Grave" },
  fine3Desc: {
    pt: "Reincidência ou grandes volumes (móveis, entulho).",
    it: "Recidiva o grandi volumi (mobili, macerie).",
  },
  finesFoot: {
    pt: "Valores ilustrativos. Consulte o regulamento da sua câmara municipal.",
    it: "Importi indicativi. Consulta il regolamento del tuo comune.",
  },
  footer: {
    pt: "PULITA · Mantenha a sua rua limpa. Um gesto por dia.",
    it: "PULITA · Mantieni pulita la tua strada. Un gesto al giorno.",
  },
  notifNeeded: {
    pt: "Ative as notificações para receber o lembrete.",
    it: "Attiva le notifiche per ricevere il promemoria.",
  },
};

function Index() {
  const [now, setNow] = useState(() => new Date());
  const [reminder, setReminder] = useState(false);
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("pulita.reminder") === "1") setReminder(true);
    const savedLang = localStorage.getItem("pulita.lang");
    if (savedLang === "pt" || savedLang === "it") setLang(savedLang);
  }, []);

  function switchLang(l: Lang) {
    setLang(l);
    localStorage.setItem("pulita.lang", l);
  }

  const todayIdx = now.getDay();
  const today = SCHEDULE[todayIdx];
  const tomorrow = SCHEDULE[(todayIdx + 1) % 7];
  const hero = useMemo(() => WASTE[today.items[0]], [today]);

  async function toggleReminder() {
    if (!reminder) {
      if ("Notification" in window) {
        try {
          const perm = await Notification.requestPermission();
          if (perm !== "granted") {
            alert(T.notifNeeded[lang]);
            return;
          }
        } catch {
          /* ignore */
        }
      }
      localStorage.setItem("pulita.reminder", "1");
      setReminder(true);
    } else {
      localStorage.removeItem("pulita.reminder");
      setReminder(false);
    }
  }

  const locale = lang === "pt" ? "pt-PT" : "it-IT";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground text-xl font-black">
            P
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">PULITA</h1>
            <p className="-mt-0.5 text-xs text-muted-foreground">
              {T.tagline[lang]}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right text-sm font-semibold capitalize sm:block">
            {now.toLocaleDateString(locale, {
              weekday: "long",
              day: "2-digit",
              month: "long",
            })}
          </div>
          <div className="flex overflow-hidden rounded-full border text-xs font-bold">
            <button
              onClick={() => switchLang("pt")}
              className={`px-3 py-1.5 ${lang === "pt" ? "bg-foreground text-background" : "bg-transparent"}`}
              aria-label="Português"
            >
              PT
            </button>
            <button
              onClick={() => switchLang("it")}
              className={`px-3 py-1.5 ${lang === "it" ? "bg-foreground text-background" : "bg-transparent"}`}
              aria-label="Italiano"
            >
              IT
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5">
        <div
          className={`relative overflow-hidden rounded-3xl ${hero.bg} ${hero.fg} p-7 shadow-xl sm:p-10`}
        >
          <div className="text-sm uppercase tracking-widest opacity-80">
            {T.today[lang]}, {today.name[lang]}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-5">
            <div className="text-6xl sm:text-7xl">
              {today.items.map((w) => WASTE[w].icon).join(" ")}
            </div>
            <div>
              <h2 className="text-3xl font-black leading-tight sm:text-5xl">
                {today.items[0] === "none"
                  ? T.noneToday[lang]
                  : T.putToday[lang]}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {today.items.map((w) => (
                  <span
                    key={w}
                    className="rounded-full bg-black/15 px-3 py-1 text-sm font-semibold backdrop-blur"
                  >
                    {WASTE[w].label[lang]}
                  </span>
                ))}
              </div>
              <p className="mt-3 max-w-md text-sm opacity-90">{hero.tip[lang]}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={toggleReminder}
              className="rounded-full bg-white/95 px-5 py-3 text-sm font-bold text-foreground shadow hover:bg-white"
            >
              {reminder ? T.reminderOn[lang] : T.reminderOff[lang]}
            </button>
            <div className="text-sm opacity-90">
              {T.tomorrow[lang]} ({tomorrow.name[lang]}):{" "}
              <span className="font-semibold">
                {tomorrow.items.map((w) => WASTE[w].label[lang]).join(" + ")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-5xl px-5">
        <h3 className="mb-4 text-xl font-bold">{T.weekCalendar[lang]}</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {SCHEDULE.map((d, i) => {
            const main = WASTE[d.items[0]];
            const isToday = i === todayIdx;
            return (
              <div
                key={i}
                className={`rounded-2xl border p-4 ${main.bg} ${main.fg} transition ${
                  isToday ? "scale-[1.03] ring-4 ring-foreground/30" : ""
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider opacity-80">
                  {d.short[lang]}
                </div>
                <div className="mt-1 text-2xl">
                  {d.items.map((w) => WASTE[w].icon).join("")}
                </div>
                <div className="mt-2 text-sm font-bold leading-tight">
                  {d.items.map((w) => WASTE[w].label[lang]).join(" + ")}
                </div>
                {isToday && (
                  <div className="mt-2 inline-block rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-bold">
                    {T.todayBadge[lang]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{T.noPickupNote[lang]}</p>
      </section>

      <section className="mx-auto mt-10 max-w-5xl px-5">
        <h3 className="mb-4 text-xl font-bold">{T.guide[lang]}</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(WASTE) as WasteKey[])
            .filter((k) => k !== "none")
            .map((k) => {
              const w = WASTE[k];
              return (
                <div
                  key={k}
                  className="flex items-start gap-3 rounded-2xl border bg-card p-4 shadow-sm"
                >
                  <div
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${w.bg} ${w.fg} text-2xl`}
                  >
                    {w.icon}
                  </div>
                  <div>
                    <div className="font-bold">{w.label[lang]}</div>
                    <div className="text-sm text-muted-foreground">{w.tip[lang]}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-5xl px-5">
        <div className="rounded-3xl border-2 border-destructive/30 bg-destructive/5 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-destructive text-destructive-foreground text-2xl">
              ⚠️
            </div>
            <div>
              <h3 className="text-xl font-black text-destructive">
                {T.finesTitle[lang]}
              </h3>
              <p className="mt-1 text-sm text-foreground/80">
                {T.finesIntro[lang]}
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <FineCard level={T.fine1Level[lang]} amount="25 €" desc={T.fine1Desc[lang]} />
            <FineCard level={T.fine2Level[lang]} amount="75 € – 250 €" desc={T.fine2Desc[lang]} />
            <FineCard
              level={T.fine3Level[lang]}
              amount={lang === "pt" ? "até 500 €" : "fino a 500 €"}
              desc={T.fine3Desc[lang]}
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{T.finesFoot[lang]}</p>
        </div>
      </section>

      <footer className="mx-auto mt-12 max-w-5xl px-5 py-8 text-center text-xs text-muted-foreground">
        {T.footer[lang]}
      </footer>
    </main>
  );
}

function FineCard({
  level,
  amount,
  desc,
}: {
  level: string;
  amount: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wider text-destructive">
        {level}
      </div>
      <div className="mt-1 text-2xl font-black">{amount}</div>
      <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
    </div>
  );
}
