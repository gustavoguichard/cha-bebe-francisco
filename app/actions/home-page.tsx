import type { Handle, RemixNode } from 'remix/ui'
import { css } from 'remix/ui'

import { firstName, formatQuantity, type GiftStatus } from '../data/claims.ts'
import { event } from '../data/event.ts'
import { categories, type Gift } from '../data/gifts.ts'
import type { Rsvp } from '../data/schema.ts'
import { routes } from '../routes.ts'
import { Illustration } from '../ui/illustrations.tsx'
import { font } from '../ui/theme.ts'
import { HeartSlot, Rainbow, Wreath } from '../ui/wreath.tsx'
import { Document } from './document.tsx'

export interface Notice {
  slug?: string
  message: string
}

export interface HomePageProps {
  statuses: GiftStatus[]
  myClaimIds: string[]
  rsvp: Rsvp | null
  notice?: Notice
  error?: Notice
}

const description =
  'Estamos esperando o Francisco. Escolha um presente da lista, deixe seu nome e venha celebrar com a gente no dia 19 de setembro.'

export function HomePage(handle: Handle<HomePageProps>) {
  return () => {
    let { statuses, myClaimIds, rsvp, notice, error } = handle.props
    let groups = categories
      .map((category) => ({
        category,
        items: statuses.filter((status) => status.gift.category === category),
      }))
      .filter((group) => group.items.length > 0)

    return (
      <Document description={description}>
        <a href="#presentes" mix={skipLink}>
          Ir para a lista de presentes
        </a>
        <main mix={page}>
          <Hero />
          <EventCard />
          <section id="presentes" mix={section}>
            <SectionTitle script="lista de" title="presentes" />
            <p mix={lede}>
              Cada presente mostra quantos ainda faltam. Escolha o seu, deixe seu nome e leve no dia.
              Os links são só sugestões: qualquer marca serve, e o que importa é o carinho.
            </p>
            {groups.map((group) => (
              <div key={group.category} mix={groupStyle}>
                <h3 mix={groupTitle}>{group.category}</h3>
                <div mix={groupList}>
                  {group.items.map((status) => (
                    <GiftRow
                      key={status.gift.slug}
                      status={status}
                      myClaimIds={myClaimIds}
                      notice={notice?.slug === status.gift.slug ? notice.message : undefined}
                      error={error?.slug === status.gift.slug ? error.message : undefined}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
          <section id="presenca" mix={section}>
            <SectionTitle script="confirme sua" title="presença" />
            <RsvpForm
              rsvp={rsvp}
              notice={notice?.slug === 'presenca' ? notice.message : undefined}
              error={error?.slug === 'presenca' ? error.message : undefined}
            />
          </section>
          <footer mix={footer}>
            <Rainbow />
            <p>Com amor, a família do Francisco.</p>
          </footer>
        </main>
      </Document>
    )
  }
}

function Hero() {
  return () => (
    <header mix={hero}>
      <Wreath>
        <p mix={heroSmall}>chá de</p>
        <p mix={heroScript}>bênçãos</p>
        <p mix={heroSmall}>do</p>
        <p mix={heroScriptBig}>{event.babyName}</p>
        <p mix={heroDate}>19/09</p>
      </Wreath>
      <p mix={heroLede}>{description}</p>
      <nav aria-label="Seções" mix={heroNav}>
        <a href="#presentes">Ver a lista</a>
        <a href="#presenca">Confirmar presença</a>
        <a href="#onde">Como chegar</a>
      </nav>
    </header>
  )
}

function EventCard() {
  return () => (
    <section id="onde" aria-label="Quando e onde" mix={eventCard}>
      <div mix={eventCol}>
        <p mix={eventLabel}>Quando</p>
        <p mix={eventBig}>
          {event.weekdayLabel}, {event.dateLabel}
        </p>
        {event.time ? <p mix={eventText}>às {event.time}</p> : null}
      </div>
      <div mix={eventDivider} aria-hidden="true" />
      <div mix={eventCol}>
        <p mix={eventLabel}>Onde</p>
        <p mix={eventBig}>{event.venue.name}</p>
        <p mix={eventText}>
          {event.venue.address}, {event.venue.neighborhood}
        </p>
        <p mix={eventText}>{event.venue.description}</p>
        <p mix={eventLinks}>
          <a href={event.venue.mapsUrl} target="_blank" rel="noreferrer">
            Abrir no Google Maps
          </a>
          <a href={event.venue.wazeUrl} target="_blank" rel="noreferrer">
            Abrir no Waze
          </a>
        </p>
      </div>
      <div mix={eventRow}>
        <div mix={eventCol}>
          <p mix={eventLabel}>Entregas</p>
          <p mix={eventText}>Comprou online? Pode mandar direto para a casa do Francisco:</p>
          <p mix={eventAddress}>
            {event.delivery.name}
            <br />
            {event.delivery.street}
            <br />
            {event.delivery.neighborhood}
            <br />
            {event.delivery.city}
            <br />
            CEP {event.delivery.cep}
            <br />
            CPF {event.delivery.cpf}
          </p>
          <p mix={eventNote}>
            Qualquer dúvida,{' '}
            <a href={event.pix.whatsappUrl} target="_blank" rel="noreferrer">
              fale com a gente no WhatsApp
            </a>
            .
          </p>
        </div>
        <div mix={eventCol}>
          <p mix={eventLabel}>Pix</p>
          <p mix={eventText}>Prefere dar um Pix? A chave é o celular da Ana:</p>
          <p mix={pixKey}>
            <span mix={pixKeyValue}>{event.pix.keyLabel}</span>
            <button type="button" data-copy={event.pix.key} mix={copyButton}>
              Copiar chave
            </button>
          </p>
          <p mix={eventText}>
            {event.pix.holder}, no{' '}
            <a href={event.pix.whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </p>
        </div>
      </div>
      <script>{copyScript}</script>
    </section>
  )
}

const copyScript = `
document.querySelectorAll('[data-copy]').forEach(function (button) {
  button.addEventListener('click', function () {
    var value = button.getAttribute('data-copy')
    var label = button.textContent
    var done = function () {
      button.textContent = 'Copiada!'
      setTimeout(function () { button.textContent = label }, 2000)
    }
    var fallback = function () {
      var field = document.createElement('textarea')
      field.value = value
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      try { if (document.execCommand('copy')) done() } catch (error) {}
      document.body.removeChild(field)
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(done, fallback)
    } else {
      fallback()
    }
  })
})
`

function SectionTitle(handle: Handle<{ script: string; title: string }>) {
  return () => (
    <h2 mix={sectionTitle}>
      <span mix={sectionScript}>{handle.props.script}</span>
      <span mix={sectionWord}>{handle.props.title}</span>
    </h2>
  )
}

function GiftRow(
  handle: Handle<{ status: GiftStatus; myClaimIds: string[]; notice?: string; error?: string }>,
) {
  return () => {
    let { status, myClaimIds, notice, error } = handle.props
    let { gift, claims, taken, remaining } = status
    let done = remaining === 0

    return (
      <article id={gift.slug} mix={[row, done ? rowDone : null]}>
        <div mix={thumb}>
          {gift.image ? (
            <img src={gift.image} alt="" loading="lazy" width="120" height="120" />
          ) : (
            <Illustration name={gift.illustration ?? 'gift'} />
          )}
        </div>
        <div mix={rowBody}>
          <h4 mix={rowTitle}>{gift.name}</h4>
          <p mix={rowText}>{gift.description}</p>
          {gift.note ? <p mix={rowNote}>{gift.note}</p> : null}
          <div mix={slots}>
            <div mix={hearts} aria-hidden="true">
              {Array.from({ length: gift.quantity }, (_, index) => (
                <HeartSlot key={index} filled={index < taken} />
              ))}
            </div>
            <p mix={slotsLabel}>{availabilityLabel(gift, taken, remaining)}</p>
          </div>
          {gift.links.length > 0 ? (
            <p mix={links}>
              {gift.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                  {link.price ? <span mix={price}> {link.price}</span> : null}
                </a>
              ))}
            </p>
          ) : null}
          {claims.length > 0 ? (
            <ul mix={givers}>
              {claims.map((claim) => (
                <li key={claim.id} mix={giver}>
                  <span mix={giverName}>{firstName(claim.name)}</span>
                  <span>
                    leva {formatQuantity(gift, claim.quantity)}
                  </span>
                  {myClaimIds.includes(claim.id) ? (
                    <form method="post" action={routes.desfazer.href({ id: claim.id })} data-rmx-reset-scroll="false" mix={inlineForm}>
                      <button type="submit" mix={linkButton}>
                        desfazer
                      </button>
                    </form>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
          {notice ? <p mix={noticeBox}>{notice}</p> : null}
          {error ? <p mix={errorBox}>{error}</p> : null}
          {done ? null : (
            <details mix={claimDetails} open={error ? true : undefined}>
              <summary mix={claimSummary}>Vou levar</summary>
              <form method="post" action={routes.reservar.href({ slug: gift.slug })} data-rmx-reset-scroll="false" mix={claimForm}>
                <label mix={field}>
                  <span>Seu nome</span>
                  <input name="name" type="text" required maxLength={60} autocomplete="name" mix={input} />
                </label>
                {remaining > 1 ? (
                  <label mix={field}>
                    <span>Quantos</span>
                    <select name="quantity" mix={[input, select]}>
                      {Array.from({ length: remaining }, (_, index) => (
                        <option key={index} value={String(index + 1)}>
                          {formatQuantity(gift, index + 1)}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : (
                  <input type="hidden" name="quantity" value="1" />
                )}
                <button type="submit" mix={button}>
                  Confirmar presente
                </button>
              </form>
            </details>
          )}
        </div>
      </article>
    )
  }
}

function availabilityLabel(gift: Gift, taken: number, remaining: number) {
  if (remaining === 0) return 'Já garantido'
  let verb = remaining === 1 ? 'Falta' : 'Faltam'
  if (taken === 0) return `${verb} ${formatQuantity(gift, remaining)}`
  return `${verb} ${remaining} de ${formatQuantity(gift, gift.quantity)}`
}

function RsvpForm(handle: Handle<{ rsvp: Rsvp | null; notice?: string; error?: string }>) {
  return () => {
    let { rsvp, notice, error } = handle.props
    return (
      <div mix={rsvpCard}>
        <p mix={lede}>
          {rsvp
            ? `Presença confirmada, ${firstName(rsvp.name)}. Se algo mudar, é só atualizar aqui.`
            : 'Conte pra gente quem vem, assim preparamos tudo com carinho.'}
        </p>
        {notice ? <p mix={noticeBox}>{notice}</p> : null}
        {error ? <p mix={errorBox}>{error}</p> : null}
        <form method="post" action={routes.confirmarPresenca.href()} data-rmx-reset-scroll="false" mix={rsvpForm}>
          <label mix={field}>
            <span>Seu nome</span>
            <input
              name="name"
              type="text"
              required
              maxLength={80}
              autocomplete="name"
              value={rsvp?.name ?? ''}
              mix={input}
            />
          </label>
          <div mix={fieldRow}>
            <label mix={field}>
              <span>Adultos</span>
              <select name="adults" mix={[input, select]}>
                {countOptions(1, 8, rsvp?.adults ?? 1)}
              </select>
            </label>
            <label mix={field}>
              <span>Crianças</span>
              <select name="children" mix={[input, select]}>
                {countOptions(0, 8, rsvp?.children ?? 0)}
              </select>
            </label>
          </div>
          <label mix={field}>
            <span>Um recado para o Francisco (opcional)</span>
            <textarea name="message" rows={3} maxLength={500} mix={[input, textarea]} value={rsvp?.message ?? ''} />
          </label>
          <button type="submit" mix={button}>
            {rsvp ? 'Atualizar presença' : 'Confirmar presença'}
          </button>
        </form>
      </div>
    )
  }
}

function countOptions(from: number, to: number, selected: number): RemixNode[] {
  let options: RemixNode[] = []
  for (let value = from; value <= to; value++) {
    options.push(
      <option key={value} value={String(value)} selected={value === selected ? true : undefined}>
        {value}
      </option>,
    )
  }
  return options
}

const page = css({
  maxWidth: '760px',
  margin: '0 auto',
  padding: '32px 20px 64px',
  '@media (min-width: 640px)': { padding: '56px 32px 96px' },
})

const skipLink = css({
  position: 'absolute',
  left: '-999px',
  top: '8px',
  background: 'var(--paper-light)',
  padding: '8px 12px',
  '&:focus': { left: '8px', zIndex: 10 },
})

const hero = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '28px',
  textAlign: 'center',
})

const heroSmall = css({
  fontStyle: 'italic',
  fontSize: 'clamp(18px, 4.5vw, 24px)',
  color: 'var(--ink-soft)',
  lineHeight: 1.1,
})

const heroScript = css({
  fontFamily: font.script,
  fontSize: 'clamp(48px, 13vw, 76px)',
  color: 'var(--olive)',
  lineHeight: 0.95,
  margin: '2px 0 8px',
})

const heroScriptBig = css({
  fontFamily: font.script,
  fontSize: 'clamp(56px, 15vw, 88px)',
  color: 'var(--ink)',
  lineHeight: 0.95,
  margin: '2px 0 10px',
})

const heroDate = css({
  fontSize: 'clamp(18px, 4.5vw, 22px)',
  letterSpacing: '0.12em',
  color: 'var(--clay)',
  fontVariationSettings: "'wght' 600",
})

const heroLede = css({
  maxWidth: '520px',
  fontSize: '18px',
  lineHeight: 1.6,
  color: 'var(--ink-soft)',
})

const heroNav = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '10px 22px',
  fontStyle: 'italic',
  fontSize: '17px',
})

const eventCard = css({
  margin: '56px 0 0',
  padding: '28px 24px',
  background: 'var(--paper-light)',
  border: '1px solid var(--line)',
  borderRadius: '28px',
  display: 'grid',
  gap: '24px',
  '@media (min-width: 640px)': {
    gridTemplateColumns: '1fr auto 1.4fr',
    padding: '32px 36px',
  },
})

const eventCol = css({ display: 'flex', flexDirection: 'column', gap: '4px' })

const eventDivider = css({
  borderTop: '1px solid var(--line)',
  '@media (min-width: 640px)': { borderTop: 0, borderLeft: '1px solid var(--line)' },
})

const eventLabel = css({
  fontFamily: font.script,
  fontSize: '30px',
  lineHeight: 1,
  color: 'var(--sage)',
  marginBottom: '4px',
})

const eventBig = css({
  fontSize: '22px',
  lineHeight: 1.25,
  fontVariationSettings: "'wght' 500",
})

const eventText = css({ color: 'var(--ink-soft)' })

const eventLinks = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px 18px',
  marginTop: '8px',
  fontStyle: 'italic',
})

const eventRow = css({
  gridColumn: '1 / -1',
  paddingTop: '24px',
  borderTop: '1px solid var(--line)',
  display: 'grid',
  gap: '24px',
  '@media (min-width: 640px)': { gridTemplateColumns: '1fr 1fr' },
})

const eventAddress = css({ lineHeight: 1.5 })

const eventNote = css({ fontStyle: 'italic', color: 'var(--ink-soft)', fontSize: '16px', marginTop: '4px' })

const pixKey = css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 14px', margin: '4px 0' })

const pixKeyValue = css({
  fontSize: '22px',
  lineHeight: 1.25,
  fontVariationSettings: "'wght' 500",
})

const copyButton = css({
  cursor: 'pointer',
  padding: '6px 14px',
  borderRadius: '999px',
  border: '1px solid var(--olive)',
  background: 'transparent',
  color: 'var(--olive)',
  fontSize: '15px',
  fontVariationSettings: "'wght' 500",
  '&:hover': { background: 'var(--paper-light)' },
})

const section = css({ marginTop: '72px' })

const sectionTitle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  lineHeight: 1.05,
  marginBottom: '28px',
})

const sectionScript = css({
  fontFamily: font.script,
  fontSize: '34px',
  color: 'var(--sage)',
  marginLeft: '2px',
})

const sectionWord = css({
  fontSize: 'clamp(36px, 8vw, 48px)',
  fontVariationSettings: "'wght' 500, 'opsz' 144",
  letterSpacing: '-0.01em',
})

const lede = css({ maxWidth: '560px', color: 'var(--ink-soft)', fontSize: '18px', lineHeight: 1.6 })

const groupStyle = css({ marginTop: '40px' })

const groupTitle = css({
  fontStyle: 'italic',
  fontSize: '22px',
  color: 'var(--olive)',
  paddingBottom: '10px',
  borderBottom: '1px solid var(--line)',
  marginBottom: '8px',
})

const groupList = css({ display: 'flex', flexDirection: 'column' })

const row = css({
  display: 'grid',
  gridTemplateColumns: '84px 1fr',
  gap: '18px',
  padding: '22px 0',
  borderBottom: '1px solid var(--line)',
  scrollMarginTop: '24px',
  '@media (min-width: 640px)': { gridTemplateColumns: '120px 1fr', gap: '24px', padding: '26px 0' },
})

const rowDone = css({
  '& img, & svg': { filter: 'saturate(0.6)', opacity: 0.8 },
})

const thumb = css({
  width: '84px',
  height: '84px',
  borderRadius: '50%',
  background: 'var(--paper-light)',
  border: '1px solid var(--line)',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  '& img': { width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' },
  '@media (min-width: 640px)': { width: '120px', height: '120px', padding: '14px' },
})

const rowBody = css({ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 })

const rowTitle = css({
  fontSize: '21px',
  lineHeight: 1.25,
  fontVariationSettings: "'wght' 500, 'opsz' 32",
})

const rowText = css({ color: 'var(--ink-soft)' })

const rowNote = css({ fontStyle: 'italic', color: 'var(--olive)', fontSize: '16px' })

const slots = css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 12px', marginTop: '2px' })

const hearts = css({ display: 'flex', gap: '3px' })

const slotsLabel = css({ fontSize: '15px', color: 'var(--clay)', fontVariationSettings: "'wght' 500" })

const links = css({ display: 'flex', flexWrap: 'wrap', gap: '4px 18px', fontSize: '16px' })

const price = css({ color: 'var(--ink-soft)', fontStyle: 'italic' })

const givers = css({
  listStyle: 'none',
  margin: '2px 0 0',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  fontSize: '16px',
  color: 'var(--ink-soft)',
})

const giver = css({ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0 8px' })

const giverName = css({
  fontFamily: font.script,
  fontSize: '26px',
  lineHeight: 1,
  color: 'var(--ink)',
})

const inlineForm = css({ display: 'inline' })

const linkButton = css({
  background: 'none',
  border: 0,
  padding: 0,
  fontStyle: 'italic',
  color: 'var(--clay)',
  cursor: 'pointer',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  textDecorationColor: 'var(--line)',
})

const noticeBox = css({
  padding: '10px 14px',
  borderRadius: '14px',
  background: 'var(--sage-soft)',
  color: 'var(--olive)',
  fontSize: '16px',
})

const errorBox = css({
  padding: '10px 14px',
  borderRadius: '14px',
  background: '#F1D9CC',
  color: '#7A3E27',
  fontSize: '16px',
})

const claimDetails = css({
  marginTop: '4px',
  '&[open] summary': { color: 'var(--ink-soft)' },
})

const claimSummary = css({
  cursor: 'pointer',
  listStyle: 'none',
  display: 'inline-block',
  padding: '9px 18px',
  borderRadius: '999px',
  border: '1px solid var(--olive)',
  color: 'var(--olive)',
  fontSize: '16px',
  fontVariationSettings: "'wght' 500",
  '&::-webkit-details-marker': { display: 'none' },
  '&:hover': { background: 'var(--paper-light)' },
})

const claimForm = css({
  marginTop: '14px',
  padding: '18px',
  background: 'var(--paper-light)',
  border: '1px solid var(--line)',
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  maxWidth: '420px',
})

const field = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  fontSize: '15px',
  color: 'var(--ink-soft)',
})

const fieldRow = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '14px',
  '& > label': { flex: '1 1 140px' },
})

const input = css({
  padding: '10px 12px',
  borderRadius: '12px',
  border: '1px solid var(--line)',
  background: '#fff',
  color: 'var(--ink)',
  fontSize: '17px',
  width: '100%',
  '&:focus': { borderColor: 'var(--sage)', outline: 'none', boxShadow: '0 0 0 3px var(--sage-soft)' },
})

const textarea = css({ resize: 'vertical', minHeight: '84px', lineHeight: 1.5 })

const select = css({
  appearance: 'none',
  WebkitAppearance: 'none',
  paddingRight: '40px',
  cursor: 'pointer',
  backgroundColor: '#fff',
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%234F5B3B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 14px center',
  backgroundSize: '12px',
})

const button = css({
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

const rsvpCard = css({
  padding: '24px',
  background: 'var(--paper-light)',
  border: '1px solid var(--line)',
  borderRadius: '28px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  '@media (min-width: 640px)': { padding: '32px 36px' },
})

const rsvpForm = css({ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '480px' })

const footer = css({
  marginTop: '80px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '14px',
  color: 'var(--ink-soft)',
  fontStyle: 'italic',
  textAlign: 'center',
})
