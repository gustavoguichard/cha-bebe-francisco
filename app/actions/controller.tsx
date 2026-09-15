import * as s from 'remix/data-schema'
import { max, maxLength, min, minLength } from 'remix/data-schema/checks'
import * as coerce from 'remix/data-schema/coerce'
import * as f from 'remix/data-schema/form-data'
import { redirect } from 'remix/response/redirect'
import { createController } from 'remix/router'
import { Session } from 'remix/session'

import { countTaken, firstName, loadGiftStatuses } from '../data/claims.ts'
import { event } from '../data/event.ts'
import { findGift } from '../data/gifts.ts'
import { claims, rsvps } from '../data/schema.ts'
import { databaseContext } from '../middleware/database.ts'
import { routes } from '../routes.ts'
import { AdminPage } from './admin-page.tsx'
import { HomePage, type Notice } from './home-page.tsx'
import { OgCard } from './og-card.tsx'

const name = s
  .string()
  .transform((value) => value.trim().replace(/\s+/g, ' '))
  .pipe(minLength(2), maxLength(80))

const claimSchema = f.object({
  name: f.field(name),
  quantity: f.field(coerce.number().refine(Number.isInteger).pipe(min(1), max(50))),
})

const rsvpSchema = f.object({
  name: f.field(name),
  adults: f.field(coerce.number().refine(Number.isInteger).pipe(min(1), max(20))),
  children: f.field(coerce.number().refine(Number.isInteger).pipe(min(0), max(20))),
  message: f.field(s.defaulted(s.string(), '').transform((value) => value.trim().slice(0, 500))),
})

function myClaims(session: Session): string[] {
  let value = session.get('claims')
  return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string') : []
}

function readNotice(session: Session, key: 'notice' | 'error'): Notice | undefined {
  let value = session.get(key)
  return value && typeof value === 'object' && 'message' in value ? (value as Notice) : undefined
}

export default createController(routes, {
  actions: {
    async home({ get, render }) {
      let db = get(databaseContext)
      let session = get(Session)
      let statuses = await loadGiftStatuses(db)
      let rsvpId = session.get('rsvpId')
      let rsvp = typeof rsvpId === 'string' ? await db.findOne(rsvps, { where: { id: rsvpId } }) : null

      return render(
        <HomePage
          statuses={statuses}
          myClaimIds={myClaims(session)}
          rsvp={rsvp}
          notice={readNotice(session, 'notice')}
          error={readNotice(session, 'error')}
        />,
      )
    },

    async reservar({ get, params }) {
      let gift = findGift(params.slug)
      if (!gift) return new Response('Not Found', { status: 404 })

      let session = get(Session)
      let back = `${routes.home.href()}#${gift.slug}`
      let parsed = s.parseSafe(claimSchema, get(FormData))
      if (!parsed.success) {
        session.flash('error', { slug: gift.slug, message: 'Confira seu nome e a quantidade e tente de novo.' })
        return redirect(back, 303)
      }

      let db = get(databaseContext)
      let { name, quantity } = parsed.value
      let created = await db.transaction(async (tx) => {
        let taken = await countTaken(tx, gift.slug)
        if (taken + quantity > gift.quantity) return null
        let id = crypto.randomUUID()
        await tx.create(claims, {
          id,
          item_slug: gift.slug,
          name,
          quantity,
          created_at: new Date().toISOString(),
        })
        return id
      })

      if (!created) {
        session.flash('error', {
          slug: gift.slug,
          message: 'Alguém acabou de escolher este presente. Dá uma olhada no que ainda falta.',
        })
        return redirect(back, 303)
      }

      session.set('claims', [...myClaims(session), created])
      session.flash('notice', {
        slug: gift.slug,
        message: `Obrigado, ${firstName(name)}! Anotamos que você leva ${quantity === 1 ? gift.unit.one === 'unidade' ? 'este presente' : `1 ${gift.unit.one}` : `${quantity} ${gift.unit.many}`}.`,
      })
      return redirect(back, 303)
    },

    async desfazer({ get, params }) {
      let session = get(Session)
      let mine = myClaims(session)
      if (!mine.includes(params.id)) return new Response('Forbidden', { status: 403 })

      let db = get(databaseContext)
      let claim = await db.findOne(claims, { where: { id: params.id } })
      if (claim) await db.delete(claims, claim.id)

      session.set('claims', mine.filter((id) => id !== params.id))
      session.flash('notice', {
        slug: claim?.item_slug,
        message: 'Tudo bem, desfizemos a sua escolha.',
      })
      return redirect(`${routes.home.href()}#${claim?.item_slug ?? 'presentes'}`, 303)
    },

    async confirmarPresenca({ get }) {
      let session = get(Session)
      let back = `${routes.home.href()}#presenca`
      let parsed = s.parseSafe(rsvpSchema, get(FormData))
      if (!parsed.success) {
        session.flash('error', { slug: 'presenca', message: 'Confira seu nome e tente de novo.' })
        return redirect(back, 303)
      }

      let db = get(databaseContext)
      let { name, adults, children, message } = parsed.value
      let existingId = session.get('rsvpId')
      let existing =
        typeof existingId === 'string' ? await db.findOne(rsvps, { where: { id: existingId } }) : null

      if (existing) {
        await db.update(rsvps, existing.id, { name, adults, children, message: message || undefined })
      } else {
        let id = crypto.randomUUID()
        await db.create(rsvps, {
          id,
          name,
          adults,
          children,
          message: message || undefined,
          created_at: new Date().toISOString(),
        })
        session.set('rsvpId', id)
      }

      session.flash('notice', {
        slug: 'presenca',
        message: existing
          ? 'Presença atualizada. Até o dia 19!'
          : `Presença confirmada, ${firstName(name)}. Até o dia 19!`,
      })
      return redirect(back, 303)
    },

    og({ render }) {
      return render(<OgCard />)
    },

    async removerReserva({ get, params }) {
      if (params.chave !== event.adminKey) return new Response('Not Found', { status: 404 })
      let db = get(databaseContext)
      let claim = await db.findOne(claims, { where: { id: params.id } })
      if (claim) await db.delete(claims, claim.id)
      return redirect(routes.admin.href({ chave: params.chave }), 303)
    },

    async removerPresenca({ get, params }) {
      if (params.chave !== event.adminKey) return new Response('Not Found', { status: 404 })
      let db = get(databaseContext)
      let rsvp = await db.findOne(rsvps, { where: { id: params.id } })
      if (rsvp) await db.delete(rsvps, rsvp.id)
      return redirect(routes.admin.href({ chave: params.chave }), 303)
    },

    async admin({ get, params, render }) {
      if (params.chave !== event.adminKey) {
        return new Response('Not Found', { status: 404 })
      }

      let db = get(databaseContext)
      let statuses = await loadGiftStatuses(db)
      let allRsvps = await db.findMany(rsvps, { orderBy: ['created_at', 'asc'] })
      return render(<AdminPage statuses={statuses} rsvps={allRsvps} chave={params.chave} />)
    },
  },
})
