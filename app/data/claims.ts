import type { Database } from 'remix/data-table'

import { gifts, type Gift } from './gifts.ts'
import { claims, type Claim } from './schema.ts'

export interface GiftStatus {
  gift: Gift
  claims: Claim[]
  taken: number
  remaining: number
}

export async function loadGiftStatuses(db: Database): Promise<GiftStatus[]> {
  let all = await db.findMany(claims, { orderBy: ['created_at', 'asc'] })

  return gifts.map((gift) => {
    let own = all.filter((claim) => claim.item_slug === gift.slug)
    let taken = own.reduce((sum, claim) => sum + claim.quantity, 0)
    return { gift, claims: own, taken, remaining: Math.max(0, gift.quantity - taken) }
  })
}

export async function countTaken(db: Database, slug: string): Promise<number> {
  let own = await db.findMany(claims, { where: { item_slug: slug } })
  return own.reduce((sum, claim) => sum + claim.quantity, 0)
}

export function formatQuantity(gift: Gift, quantity: number) {
  return `${quantity} ${quantity === 1 ? gift.unit.one : gift.unit.many}`
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name
}
