# PULITA

> Rifiuto giusto, giorno giusto. Evita le multe e mantieni la tua strada pulita.

PULITA e un'applicazione web semplice e diretta che aiuta persone di tutte le eta a ricordarsi di mettere la spazzatura in strada nel giorno corretto. Con colori pratici e un design moderno, l'app identifica rapidamente il tipo di rifiuto da conferire ogni giorno della settimana.

## Funzionalita

- **Visualizzazione del giorno corrente** — vedi immediatamente quale spazzatura mettere oggi con un colore di rilievo corrispondente al rifiuto.
- **Calendario settimanale** — consulta i 7 giorni della settimana in un'unica vista.
- **Guida ai rifiuti** — scopri cosa va in ogni contenitore (organico, plastica/metallo, vetro, carta/cartone, indifferenziato).
- **Promemoria giornaliero** — attiva le notifiche del browser per ricevere un avviso.
- **Informazioni sulle multe** — valori di riferimento per chi mette la spazzatura sbagliata.
- **Design inclusivo** — interfaccia accessibile, con colori forti e tipografia leggibile, adatta a tutti i pubblici, giovani e anziani.

## Calendario di Raccolta

| Giorno | Rifiuto(i) | Colore |
|--------|-----------|--------|
| Lunedi | Organico | Marrone |
| Martedi | Plastica / Metallo | Giallo |
| Mercoledi | Vetro + Organico | Verde + Marrone |
| Giovedi | Indifferenziato | Grigio |
| Venerdi | Carta / Cartone + Organico | Blu + Marrone |
| Sabato | Plastica / Metallo | Giallo |
| Domenica | Nessuna raccolta | — |

> **Nota:** La domenica e i festivi non c'e raccolta.

## Colori di Identificazione

| Rifiuto | Colore | Icona |
|---------|--------|-------|
| Organico | Marrone | |
| Plastica / Metallo | Giallo | |
| Vetro | Verde | |
| Carta / Cartone | Blu | |
| Indifferenziato | Grigio | |
| Nessuna raccolta | Grigio chiaro | |

## Multe (Valori Indicativi)

| Infrazione | Valore |
|------------|--------|
| Avviso (prima infrazione) | 25 EUR |
| Multa (giorno o contenitore sbagliato) | 75 EUR – 250 EUR |
| Grave (recidiva, grandi volumi) | fino a 500 EUR |

> Consulta il regolamento del tuo comune per i valori ufficiali.

## Tecnologie

- **TanStack Start v1** — framework full-stack React con SSR e file-based routing
- **React 19** — libreria per le interfacce
- **Tailwind CSS v4** — stilizzazione utility-first
- **TypeScript** — tipizzazione statica
- **Vite 7** — bundler e dev server
- **Bun** — runtime e package manager

## Struttura del Progetto

```
src/
  routes/
    index.tsx        # Pagina principale (PULITA)
    __root.tsx       # Layout radice
  components/
    ui/              # Componenti shadcn/ui
  hooks/
    use-mobile.tsx   # Hook di rilevazione mobile
  lib/
    utils.ts         # Utilita (cn, ecc.)
  styles.css         # Token del design system (colori, tipografia)
  router.tsx         # Configurazione del router
  start.ts           # Configurazione del server TanStack
```

## Come Eseguire

Requisiti: [Bun](https://bun.sh) (o Node.js + npm)

```bash
# Installare le dipendenze
bun install

# Server di sviluppo
bun run dev

# Build di produzione
bun run build
```

L'applicazione si apre su `http://localhost:3000` per default.

## SEO

- Titolo: *PULITA — Ricorda la spazzatura al momento giusto*
- Descrizione meta: promemoria semplice per mettere il rifiuto giusto nel giorno giusto.
- Design responsivo: ottimizzato per mobile e desktop.

## Autore

Realizzato con per facilitare la raccolta dei rifiuti in Italia.
