import { css } from 'remix/ui'

import { event } from '../data/event.ts'
import { font } from '../ui/theme.ts'
import { Wreath } from '../ui/wreath.tsx'
import { Document } from './document.tsx'

export function OgCard() {
  return () => (
    <Document title="Cartão do chá">
      <div mix={card}>
        <div mix={left}>
          <Wreath>
            <p mix={small}>chá de</p>
            <p mix={script}>bênçãos</p>
            <p mix={small}>do</p>
            <p mix={scriptBig}>{event.babyName}</p>
            <p mix={date}>19/09</p>
          </Wreath>
        </div>
        <div mix={right}>
          <p mix={line}>sábado, {event.dateLabel}</p>
          <p mix={venue}>{event.venue.name}</p>
          <p mix={line}>
            {event.venue.address}, {event.venue.neighborhood}
          </p>
          <p mix={invite}>Escolha um presente e confirme sua presença.</p>
        </div>
      </div>
    </Document>
  )
}

const card = css({
  width: '1200px',
  height: '630px',
  display: 'flex',
  alignItems: 'center',
  gap: '48px',
  padding: '0 80px',
  background: 'var(--paper)',
  overflow: 'hidden',
})

const left = css({ flex: '0 0 480px', '& > div': { width: '480px' } })

const right = css({ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--ink-soft)', fontSize: '26px' })

const small = css({ fontStyle: 'italic', fontSize: '28px', color: 'var(--ink-soft)', lineHeight: 1.1 })

const script = css({ fontFamily: font.script, fontSize: '88px', color: 'var(--olive)', lineHeight: 0.95, margin: '2px 0 8px' })

const scriptBig = css({ fontFamily: font.script, fontSize: '100px', color: 'var(--ink)', lineHeight: 0.95, margin: '2px 0 10px' })

const date = css({ fontSize: '26px', letterSpacing: '0.12em', color: 'var(--clay)', fontVariationSettings: "'wght' 600" })

const line = css({ lineHeight: 1.3 })

const venue = css({ fontSize: '44px', color: 'var(--ink)', lineHeight: 1.1, fontVariationSettings: "'wght' 500, 'opsz' 96" })

const invite = css({ marginTop: '18px', fontStyle: 'italic', fontSize: '24px', color: 'var(--olive)' })
