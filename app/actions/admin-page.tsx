import type { Handle } from 'remix/ui'
import { css } from 'remix/ui'

import { firstName, formatQuantity, type GiftStatus } from '../data/claims.ts'
import type { Rsvp } from '../data/schema.ts'
import { font } from '../ui/theme.ts'
import { Document } from './document.tsx'

export interface AdminPageProps {
  statuses: GiftStatus[]
  rsvps: Rsvp[]
}

export function AdminPage(handle: Handle<AdminPageProps>) {
  return () => {
    let { statuses, rsvps } = handle.props
    let adults = rsvps.reduce((sum, rsvp) => sum + rsvp.adults, 0)
    let children = rsvps.reduce((sum, rsvp) => sum + rsvp.children, 0)
    let claimed = statuses.filter((status) => status.claims.length > 0)
    let summary = buildSummary(statuses, rsvps)

    return (
      <Document title="Bastidores do chá">
        <main mix={page}>
          <h1 mix={title}>
            <span mix={script}>bastidores do</span>
            <span>chá do Francisco</span>
          </h1>

          <section mix={section}>
            <h2 mix={heading}>Presença</h2>
            <p mix={muted}>
              {rsvps.length} confirmações, {adults} adultos e {children} crianças.
            </p>
            <table mix={table}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Adultos</th>
                  <th>Crianças</th>
                  <th>Recado</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((rsvp) => (
                  <tr key={rsvp.id}>
                    <td>{rsvp.name}</td>
                    <td>{rsvp.adults}</td>
                    <td>{rsvp.children}</td>
                    <td>{rsvp.message ?? ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section mix={section}>
            <h2 mix={heading}>Presentes</h2>
            <p mix={muted}>
              {claimed.length} de {statuses.length} itens já têm alguém.
            </p>
            <table mix={table}>
              <thead>
                <tr>
                  <th>Presente</th>
                  <th>Quem leva</th>
                  <th>Faltam</th>
                </tr>
              </thead>
              <tbody>
                {statuses.map((status) => (
                  <tr key={status.gift.slug}>
                    <td>{status.gift.name}</td>
                    <td>
                      {status.claims.length === 0
                        ? '—'
                        : status.claims
                            .map((claim) => `${claim.name} (${formatQuantity(status.gift, claim.quantity)})`)
                            .join(', ')}
                    </td>
                    <td>{status.remaining}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section mix={section}>
            <h2 mix={heading}>Resumo para copiar</h2>
            <button type="button" id="copy-summary" mix={copyButton}>
              Copiar resumo
            </button>
            <textarea readOnly rows={16} id="summary" mix={summaryBox} value={summary} />
          </section>
        </main>
        <script>{copyScript}</script>
      </Document>
    )
  }
}

function buildSummary(statuses: GiftStatus[], rsvps: Rsvp[]) {
  let lines: string[] = ['Presentes', '']
  for (let status of statuses) {
    let who =
      status.claims.length === 0
        ? 'ninguém ainda'
        : status.claims
            .map((claim) => `${firstName(claim.name)} ${formatQuantity(status.gift, claim.quantity)}`)
            .join(', ')
    lines.push(`- ${status.gift.name}: ${who}${status.remaining > 0 ? ` (faltam ${status.remaining})` : ''}`)
  }
  lines.push('', 'Presença', '')
  for (let rsvp of rsvps) {
    lines.push(`- ${rsvp.name}: ${rsvp.adults} adultos, ${rsvp.children} crianças`)
  }
  return lines.join('\n')
}

const page = css({ maxWidth: '900px', margin: '0 auto', padding: '40px 20px 80px' })

const title = css({ display: 'flex', flexDirection: 'column', lineHeight: 1, fontSize: '40px' })

const script = css({ fontFamily: font.script, fontSize: '32px', color: 'var(--sage)' })

const section = css({ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '10px' })

const heading = css({ fontSize: '26px', fontStyle: 'italic', color: 'var(--olive)' })

const muted = css({ color: 'var(--ink-soft)' })

const table = css({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '16px',
  '& th, & td': {
    textAlign: 'left',
    padding: '8px 10px',
    borderBottom: '1px solid var(--line)',
    verticalAlign: 'top',
  },
  '& th': { fontStyle: 'italic', fontWeight: 400, color: 'var(--ink-soft)' },
})

const copyButton = css({
  alignSelf: 'flex-start',
  padding: '11px 22px',
  borderRadius: '999px',
  border: 0,
  background: 'var(--olive)',
  color: 'var(--paper-light)',
  fontSize: '17px',
  fontVariationSettings: "'wght' 500",
  cursor: 'pointer',
  '&:hover': { background: 'var(--sage)' },
})

const summaryBox = css({
  width: '100%',
  padding: '14px',
  borderRadius: '16px',
  border: '1px solid var(--line)',
  background: 'var(--paper-light)',
  fontFamily: 'ui-monospace, Menlo, monospace',
  fontSize: '14px',
  lineHeight: 1.5,
})

const copyScript = `
var button = document.getElementById('copy-summary');
var box = document.getElementById('summary');
var label = button.textContent;
var timer;
function done() {
  button.textContent = 'Copiado!';
  clearTimeout(timer);
  timer = setTimeout(function () { button.textContent = label; }, 2000);
}
function fallback() {
  box.focus();
  box.select();
  try { document.execCommand('copy'); } catch (e) {}
  done();
}
button.addEventListener('click', function () {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(box.value).then(done, fallback);
  } else {
    fallback();
  }
});
`
