# PULITA
- Sito per visualizzare https://pulita-lixo-na-rua.lovable.app

> Lixo certo, dia certo. Evite multas e mantenha a sua rua limpa.

PULITA e uma aplicacao web simples e objetiva que ajuda pessoas de todas as idades a lembrarem-se de colocar o lixo na rua no dia correto. Com cores praticas e um design moderno, a app identifica rapidamente o tipo de residuo a recolher em cada dia da semana.

## Funcionalidades

- **Visualizacao do dia atual** — veja imediatamente que lixo colocar hoje com uma cor de destaque correspondente ao residuo.
- **Calendario semanal** — consulte os 7 dias da semana numa so vista.
- **Guia de residuos** — descubra o que vai em cada contentor (organico, plastico/metal, vidro, papel/cartao, indiferenciado).
- **Lembrete diario** — ative notificacoes no browser para receber um alerta.
- **Informacao de coimas** — valores de referencia para quem coloca o lixo errado.
- **Design inclusivo** — interface acessivel, com cores fortes e tipografia legivel, adequada a todos os publicos, jovens e idosos.

## Calendario de Recolha

| Dia | Residuo(s) | Cor |
|-----|-----------|-----|
| Segunda-feira | Organico | Marrom |
| Terca-feira | Plastico / Metal | Amarelo |
| Quarta-feira | Vidro + Organico | Verde + Marrom |
| Quinta-feira | Indiferenciado | Cinzento |
| Sexta-feira | Papel / Cartao + Organico | Azul + Marrom |
| Sabado | Plastico / Metal | Amarelo |
| Domingo | Sem recolha | — |

> **Nota:** Aos domingos e feriados nao ha recolha.

## Cores de Identificacao

| Residuo | Cor | Icone |
|---------|-----|-------|
| Organico | Marrom | |
| Plastico / Metal | Amarelo | |
| Vidro | Verde | |
| Papel / Cartao | Azul | |
| Indiferenciado | Cinzento | |
| Sem recolha | Cinzento claro | |

## Coimas (Valores Ilustrativos)

| Infracao | Valor |
|----------|-------|
| Aviso (primeira infracao) | 25 EUR |
| Coima (dia ou contentor errado) | 75 EUR – 250 EUR |
| Grave (reincidencia, volumes grandes) | ate 500 EUR |

> Consulte o regulamento da sua camara municipal para valores oficiais.

## Tecnologias

- **TanStack Start v1** — framework full-stack React com SSR e file-based routing
- **React 19** — biblioteca de interface
- **Tailwind CSS v4** — estilizacao utilitaria
- **TypeScript** — tipagem estatica
- **Vite 7** — bundler e dev server
- **Bun** — runtime e package manager

## Estrutura do Projeto

```
src/
  routes/
    index.tsx        # Pagina principal (PULITA)
    __root.tsx       # Layout raiz
  components/
    ui/              # Componentes shadcn/ui
  hooks/
    use-mobile.tsx   # Hook de deteccao mobile
  lib/
    utils.ts         # Utilitarios (cn, etc.)
  styles.css         # Tokens de design system (cores, tipografia)
  router.tsx         # Configuracao do router
  start.ts           # Configuracao do servidor TanStack
```

## Como Executar

Requisitos: [Bun](https://bun.sh) (ou Node.js + npm)

```bash
# Instalar dependencias
bun install

# Servidor de desenvolvimento
bun run dev

# Build de producao
bun run build
```

A aplicacao abre em `http://localhost:3000` por padrao.

## SEO

- Titulo: *PULITA — Lembre-se do lixo na hora certa*
- Descricao meta: lembrete simples para colocar o lixo certo no dia certo.
- Design responsivo: otimizado para mobile e desktop.

## Autor

Feito com para facilitar a recolha de residuos em Portugal.
