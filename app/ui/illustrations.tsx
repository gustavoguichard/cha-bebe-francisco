import type { Handle } from 'remix/ui'
import { css } from 'remix/ui'

import { color } from './theme.ts'

const frame = css({
  width: '100%',
  height: '100%',
  display: 'block',
  color: color.olive,
})

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2.2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
} as const

const soft = { fill: color.sageSoft, opacity: '0.55' } as const

export function Illustration(handle: Handle<{ name: string }>) {
  return () => {
    let Piece = pieces[handle.props.name] ?? pieces.gift
    return (
      <svg viewBox="0 0 80 80" aria-hidden="true" mix={frame}>
        <Piece />
      </svg>
    )
  }
}

const pieces: Record<string, () => () => any> = {
  cotton: () => () => (
    <>
      <rect x="22" y="30" width="34" height="34" rx="9" {...soft} />
      <rect x="16" y="24" width="34" height="34" rx="9" {...stroke} />
      <rect x="28" y="18" width="34" height="34" rx="9" {...stroke} />
      <path d="M36 30c4-3 9-3 13 0" {...stroke} />
    </>
  ),
  monitor: () => () => (
    <>
      <rect x="24" y="26" width="32" height="40" rx="10" {...soft} />
      <rect x="20" y="22" width="32" height="40" rx="10" {...stroke} />
      <circle cx="36" cy="40" r="7" {...stroke} />
      <path d="M31 53h10" {...stroke} />
      <path d="M58 30c4 4 4 10 0 14M63 25c7 7 7 17 0 24" {...stroke} />
    </>
  ),
  blanket: () => () => (
    <>
      <path d="M14 30h48v28H14z" rx="6" {...soft} />
      <path d="M12 26h52c2 0 4 2 4 4v22c0 2-2 4-4 4H12c-2 0-4-2-4-4V30c0-2 2-4 4-4z" {...stroke} />
      <path d="M8 40c10-6 20 6 30 0s20-6 30 0" {...stroke} />
      <path d="M14 56v6M22 56v6M30 56v6M38 56v6M46 56v6M54 56v6M62 56v6" {...stroke} />
    </>
  ),
  diaper: () => () => (
    <>
      <path d="M16 24h48l-4 28c-10 8-30 8-40 0z" {...soft} />
      <path d="M14 22h52l-5 30c-11 9-31 9-42 0z" {...stroke} />
      <path d="M14 22c10 10 42 10 52 0" {...stroke} />
    </>
  ),
  book: () => () => (
    <>
      <path d="M40 26c-8-6-18-6-26-3v34c8-3 18-3 26 3z" {...soft} />
      <path d="M40 24c-8-6-19-6-28-3v36c9-3 20-3 28 3zM40 24c8-6 19-6 28-3v36c-9-3-20-3-28 3z" {...stroke} />
      <path d="M40 24v36" {...stroke} />
      <path d="M20 34c5-1 9-1 14 0M46 34c5-1 9-1 14 0" {...stroke} />
    </>
  ),
  sound: () => () => (
    <>
      <circle cx="36" cy="44" r="16" {...soft} />
      <circle cx="34" cy="42" r="16" {...stroke} />
      <circle cx="34" cy="42" r="5" {...stroke} />
      <path d="M56 32c5 6 5 14 0 20M62 26c9 10 9 22 0 32" {...stroke} />
    </>
  ),
  thermometer: () => () => (
    <>
      <rect x="30" y="14" width="18" height="46" rx="9" {...soft} />
      <rect x="26" y="12" width="18" height="46" rx="9" {...stroke} />
      <circle cx="35" cy="50" r="5" {...stroke} />
      <path d="M35 45V26" {...stroke} />
      <path d="M52 30c3 3 3 9 0 12M58 25c6 6 6 16 0 22" {...stroke} />
    </>
  ),
  towel: () => () => (
    <>
      <path d="M22 30h40v34H22z" {...soft} />
      <path d="M18 28h40v36H18z" {...stroke} />
      <path d="M22 28c0-10 8-14 16-14s16 4 16 14" {...stroke} />
      <circle cx="26" cy="20" r="4" {...stroke} />
      <circle cx="50" cy="20" r="4" {...stroke} />
      <path d="M18 56h40" {...stroke} />
    </>
  ),
  tower: () => () => (
    <>
      <path d="M22 22h36v10H22z" {...soft} />
      <path d="M20 18h40M22 18v46M58 18v46M22 30h36M22 44h36M22 58h36" {...stroke} />
      <path d="M30 30v14M50 30v14" {...stroke} />
    </>
  ),
  changer: () => () => (
    <>
      <rect x="14" y="30" width="52" height="26" rx="13" {...soft} />
      <rect x="10" y="28" width="52" height="26" rx="13" {...stroke} />
      <circle cx="49" cy="41" r="7" {...stroke} />
      <path d="M20 41h18" {...stroke} />
    </>
  ),
  clothes: () => () => (
    <>
      <path d="M31 35h24v14c0 8-4 12-6 17H37c-2-5-6-9-6-17z" {...soft} />
      <path d="M30 16c3 6 17 6 20 0l14 8-6 12-6-3v14c0 8-4 12-6 17H34c-2-5-6-9-6-17V33l-6 3-6-12z" {...stroke} />
      <path d="M36 58h.01M40 58h.01M44 58h.01" {...stroke} />
    </>
  ),
  gift: () => () => (
    <>
      <rect x="18" y="32" width="44" height="32" rx="6" {...soft} />
      <rect x="14" y="30" width="44" height="32" rx="6" {...stroke} />
      <path d="M36 30v32M14 44h44" {...stroke} />
      <path d="M36 30c-8 0-12-4-12-8s6-6 12 4c6-10 12-8 12-4s-4 8-12 8z" {...stroke} />
    </>
  ),
}
