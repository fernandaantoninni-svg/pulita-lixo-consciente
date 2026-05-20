import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "PULITA — Lembre-se do lixo na hora certa" },
      {
        name: "description",
        content:
          "PULITA: lembrete simples para colocar o lixo certo no dia certo. Evite multas.",
      },
    ],
  }),
});

type WasteKey = "organic" | "plastic" | "glass" | "paper" | "mixed" | "none";

const WASTE: Record<
  WasteKey,
  { label: string; icon: string; bg: string; fg: string; tip: string }
> = {
  organic: {
    label: "Orgânico",
    icon: "🍎",
    bg: "bg-[var(--waste-organic)]",
    fg: "text-[var(--waste-organic-fg)]",
    tip: "Restos de comida, cascas, borras de café, restos de jardim.",
  },
  plastic: {
    label: "Plástico / Metal",
    icon: "🥤",
    bg: "bg-[var(--waste-plastic)]",
    fg: "text-[var(--waste-plastic-fg)]",
    tip: "Garrafas PET, embalagens, latas, pacotes de bebida.",
  },
  glass: {
    label: "Vidro",
    icon: "🍾",
    bg: "bg-[var(--waste-glass)]",
    fg: "text-[var(--waste-glass-fg)]",
    tip: "Garrafas e frascos de vidro. Sem tampas nem espelhos.",
  },
  paper: {
    label: "Papel / Cartão",
    icon: "📦",
    bg: "bg-[var(--waste-paper)]",
    fg: "text-[var(--waste-paper-fg)]",
    tip: "Caixas, jornais, revistas. Dobre o cartão.",
  },
  mixed: {
    label: "Indiferenciado",
    icon: "🗑️",
    bg: "bg-[var(--waste-mixed)]",
    fg: "text-[var(--waste-mixed-fg)]",
    tip: "Tudo o que não pode ser reciclado. Saco bem fechado.",
  },
  none: {
    label: "Sem recolha",
    icon: "🚫",
    bg: "bg-[var(--waste-none)]",
    fg: "text-[var(--waste-none-fg)]",
    tip: "Não coloque lixo na rua hoje. Guarde para o próximo dia.",
  },
};

const SCHEDULE: { name: string; short: string; items: WasteKey[] }[] = [
  { name: "Domingo", short: "Dom", items: ["none"] },
  { name: "Segunda", short: "Seg", items: ["organic"] },
  { name: "Terça", short: "Ter", items: ["plastic"] },
  { name: "Quarta", short: "Qua", items: ["glass", "organic"] },
  { name: "Quinta", short: "Qui", items: ["mixed"] },
  { name: "Sexta", short: "Sex", items: ["paper", "organic"] },
  { name: "Sábado", short: "Sáb", items: ["plastic"] },
];

function Index() {
  const [now, setNow] = useState(() => new Date());
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("pulita.reminder") === "1") setReminder(true);
  }, []);

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
            alert("Ative as notificações para receber o lembrete.");
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
              Lixo certo, dia certo.
            </p>
          </div>
        </div>
        <div className="text-right text-sm font-semibold capitalize">
          {now.toLocaleDateString("pt-PT", {
            weekday: "long",
            day: "2-digit",
            month: "long",
          })}
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5">
        <div
          className={`relative overflow-hidden rounded-3xl ${hero.bg} ${hero.fg} p-7 shadow-xl sm:p-10`}
        >
          <div className="text-sm uppercase tracking-widest opacity-80">
            Hoje, {today.name}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-5">
            <div className="text-6xl sm:text-7xl">
              {today.items.map((w) => WASTE[w].icon).join(" ")}
            </div>
            <div>
              <h2 className="text-3xl font-black leading-tight sm:text-5xl">
                {today.items[0] === "none"
                  ? "Sem recolha hoje"
                  : "Coloque hoje:"}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {today.items.map((w) => (
                  <span
                    key={w}
                    className="rounded-full bg-black/15 px-3 py-1 text-sm font-semibold backdrop-blur"
                  >
                    {WASTE[w].label}
                  </span>
                ))}
              </div>
              <p className="mt-3 max-w-md text-sm opacity-90">{hero.tip}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={toggleReminder}
              className="rounded-full bg-white/95 px-5 py-3 text-sm font-bold text-foreground shadow hover:bg-white"
            >
              {reminder ? "🔔 Lembrete ativo" : "Ativar lembrete diário"}
            </button>
            <div className="text-sm opacity-90">
              Amanhã ({tomorrow.name}):{" "}
              <span className="font-semibold">
                {tomorrow.items.map((w) => WASTE[w].label).join(" + ")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-5xl px-5">
        <h3 className="mb-4 text-xl font-bold">Calendário da semana</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {SCHEDULE.map((d, i) => {
            const main = WASTE[d.items[0]];
            const isToday = i === todayIdx;
            return (
              <div
                key={d.short}
                className={`rounded-2xl border p-4 ${main.bg} ${main.fg} transition ${
                  isToday ? "scale-[1.03] ring-4 ring-foreground/30" : ""
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider opacity-80">
                  {d.short}
                </div>
                <div className="mt-1 text-2xl">
                  {d.items.map((w) => WASTE[w].icon).join("")}
                </div>
                <div className="mt-2 text-sm font-bold leading-tight">
                  {d.items.map((w) => WASTE[w].label).join(" + ")}
                </div>
                {isToday && (
                  <div className="mt-2 inline-block rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-bold">
                    HOJE
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Aos <strong>domingos e feriados</strong> não há recolha.
        </p>
      </section>

      <section className="mx-auto mt-10 max-w-5xl px-5">
        <h3 className="mb-4 text-xl font-bold">Guia dos resíduos</h3>
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
                    <div className="font-bold">{w.label}</div>
                    <div className="text-sm text-muted-foreground">{w.tip}</div>
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
                Coimas por colocar o lixo errado
              </h3>
              <p className="mt-1 text-sm text-foreground/80">
                Colocar o resíduo errado no dia errado prejudica toda a recolha.
                Valores indicativos:
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <FineCard
              level="Aviso"
              amount="25 €"
              desc="Primeira infração. Notificação por escrito."
            />
            <FineCard
              level="Coima"
              amount="75 € – 250 €"
              desc="Resíduo no dia errado ou fora do contentor correto."
            />
            <FineCard
              level="Grave"
              amount="até 500 €"
              desc="Reincidência ou grandes volumes (móveis, entulho)."
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Valores ilustrativos. Consulte o regulamento da sua câmara
            municipal.
          </p>
        </div>
      </section>

      <footer className="mx-auto mt-12 max-w-5xl px-5 py-8 text-center text-xs text-muted-foreground">
        PULITA · Mantenha a sua rua limpa. Um gesto por dia.
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
